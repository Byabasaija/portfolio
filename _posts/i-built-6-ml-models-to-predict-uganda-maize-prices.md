---
title: "I Built 6 ML Models to Predict Uganda Maize Prices. A Rolling Average Beat All of Them."
date: "2025-06-15"
category: Machine Learning
coverImage: /images/banner/posts/maize-prices.jpg
excerpt: "Six months of experiments across Random Forest, Prophet, CPI deflation, and East African market data. Here's what I actually learned."
author:
  name: Pascal
  picture: "https://github.com/Byabasaija.png"
tags:
  - Machine Learning
  - Agriculture
  - East Africa
  - Uganda
  - Time Series
  - Python
  - FastAPI
publishedAt: "2025-06-15"
ogImage:
  url: "/images/banner/posts/maize-prices.jpg"
summary: "Six ML model variants, real production deployment, and a 3-line formula that beat everything. A honest account of building an agricultural price prediction API for East Africa."
banner: /images/banner/posts/maize-prices.jpg
alt: "Uganda maize prices ML project"
mathjax: false
---

![Uganda maize price prediction — model comparison](/images/banner/posts/maize-prices-model-comparison.png)

Maize is Uganda's most consumed staple. At Owino market in Kampala — the country's largest informal market — prices swing by hundreds of shillings per kilogram between months. A farmer who plants in March doesn't know what he'll earn at harvest in July. A trader who buys in bulk in November is gambling on December prices.

I wanted to build something useful: an API that predicts next month's maize price at Owino. What I got was a six-month education in why ML fails on short economic time series — and a finding that's more valuable than any model improvement.

---

![Owino market maize price 2010–2025](/images/banner/posts/maize-prices-timeline.png)

## The Setup

**Data:** WFP food price monitoring data for Uganda, published monthly via HDX. 177 rows covering January 2010 to April 2025. One number per month: the retail price of maize per kilogram at Owino market, Kampala.

**Goal:** Predict next month's price. The API should be useful to traders, NGOs, and agricultural planners.

**Stack:** Python, scikit-learn, FastAPI, HuggingFace (model + datasets), deployed to a VPS.

**Baseline to beat:** Rolling mean of the last 3 months. MAE 196 UGX/kg. Three lines of code.

---

## The Models, In Order

### v1–v2: Basic Random Forest

Started simple. Load prices, compute lag features (last 1, 2, 3 months), rolling means, month, year. Train a Random Forest. MAE around 700 on the 2024 test set.

The model had never seen prices correct after a spike. The 2022–2023 price surge (maize hitting 3,500 UGX/kg) was in training. The 2024 correction back to 1,700–2,000 was in the test set. Random Forest cannot extrapolate below its training range, so it kept predicting "high" when prices had already fallen.

### v3: Adding Maize-Specific CPI (MAE 224 — but it was a lie)

Uganda Bureau of Statistics publishes a maize-specific Consumer Price Index. Adding it as a feature dropped MAE to 224. The model was excited. I was excited.

Then I found the bug.

The model was using the **same month's CPI** to predict the same month's price. In production, when a user calls `/predict` for June 2025, they don't know June 2025's CPI yet — UBOS publishes it weeks later. The model was cheating.

When I fixed it to use last month's CPI instead (the only value actually available at prediction time), MAE jumped to 268. The 224 was fake.

**Lesson:** Data leakage is subtle. Always ask: at prediction time, is this feature actually available?

There was a second problem: UBOS only introduced maize-specific CPI codes after a 2016–2017 rebasing. Before that, there's no maize CPI. This capped all training data at 2017 — 65 rows instead of 177.

### v4: Drop CPI, Add World Bank Global Maize Price + FX (MAE 223)

If CPI was causing problems, could we replace it with features that go back further?

I added:
- **World Bank Pink Sheet** monthly global maize price (Chicago CME, USD/tonne, back to 1960)
- **World Bank FX rate** — annual UGX/USD exchange rate

This unlocked 155 training rows (back to 2010) instead of 65. Three times more data.

MAE: 223. One UGX better than the leaky v3. Not meaningful progress.

Feature importances told the real story: `price_lag_1` (38%), `rolling_mean_3` (18%). The global maize price scored 6.5%. The model was mostly saying "next month ≈ last month."

I also ran the correlation analysis. Uganda is a net maize exporter trading in East African markets, not Chicago. The detrended correlation between global CME price and Owino price: 0.275. Moderate at best. But removing it made MAE worse (269), so it stayed.

### v5: Real Prices — Deflate by CPI, Train on Real Prices (MAE 263)

In v3, food CPI had 59% feature importance. The model wasn't forecasting — it was tracking inflation. What if we removed inflation before training?

```
real_price = nominal_price / cpi * 100
model.train(real_prices)
predicted_nominal = model.predict(real_features) * current_cpi / 100
```

MAE (re-inflated): 263. Worse.

Conclusion: CPI as a direct feature genuinely helps, even with the leakage risk. Deflation removes context the model was using legitimately.

### v6: East African Regional Prices + Feature Engineering (MAE 216)

Uganda doesn't trade with Chicago. It trades with Kenya and Tanzania. WFP monitors Nairobi and Dar es Salaam markets too — maybe their prices are a better signal.

I also added five feature engineering changes:
1. East African maize price (Kenya + Tanzania average, USD/kg) replacing global price
2. `price_lag_6` and `price_lag_12` — capturing harvest seasonality
3. `price_momentum = price_lag_1 - price_lag_2` — direction of movement
4. Cyclical month encoding: `sin(2π×month/12)` and `cos(2π×month/12)` — treating January and December as neighbours, not 11 apart

**One problem:** Kenya WFP data ends March 2022. Tanzania ends March 2020. For the 2024 test period, I fell back to global price. So the EA price improvement only truly applies to training rows, not the test set.

MAE: 216. Our best honest model.

Feature importances: `price_lag_1` (38%), `rolling_mean_3` (19%), `year` (12%). The new features each scored under 3%. They helped, but didn't change the fundamental structure.

### Prophet: The Disaster

Before v6, I tried Facebook Prophet — a purpose-built time series forecasting library that handles trend, seasonality, and structural breaks.

MAE: 1,169. Six times worse than the naive baseline.

Prophet fit an upward trend to 2017–2023 prices, then extrapolated that trend into 2024. It consistently predicted 3,000–3,500 UGX/kg when actual prices were 1,700–2,000. Both flat-trend and default Prophet failed the same way.

---

## The Result Table

| Model | MAE (UGX/kg) | Notes |
|-------|-------------|-------|
| Naive baseline (rolling mean 3) | **196** | 3 lines of code |
| v3 — maize CPI | 224 | Leaky — uses same-month CPI |
| v3 — CPI lag-1 (honest) | 268 | What v3 actually does in production |
| v4 — global maize + FX | 223 | Best honest non-EA model |
| v5 — real prices | 263 | Deflation approach |
| v6 — EA prices + feature engineering | 216 | Best honest ML model |
| Prophet | 1,169 | Trend extrapolation failure |

The naive baseline wins. It always won.

---

![Test period predictions: v6 vs naive baseline vs actual](/images/banner/posts/maize-prices-predictions.png)

## Why the Naive Baseline Wins

This isn't a failure specific to this project. The Makridakis M-competitions documented exactly this in the 1980s: on short time series with high autocorrelation, simple baselines consistently outperform ML. The finding has been replicated many times since.

For maize prices at Owino:
- The price is strongly mean-reverting in the short term
- Last month's price is the single best predictor of next month's price
- Adding complexity introduces the risk of getting caught by regime changes

The 2024 test period coincided with a structural break — a sharp price correction after the 2022–2023 spike. No model trained before the correction could predict it. The naive baseline survived by adjusting month-by-month. Every ML model overfit to "high prices are normal."

**177 monthly rows is not enough data for ML to win on this problem.** You'd need thousands of rows — which means either daily price data or years of additional collection.

---

## What I Actually Built

The finding doesn't mean the project was wasted. I built:

- A complete data pipeline: WFP HDX → feature engineering → model training
- A production FastAPI with proper lifespan management, external data fetching (World Bank, HDX), and fallback logic
- Datasets published to HuggingFace (`byabasaija/uganda-maize-prices`, `byabasaija/uganda-food-cpi`)
- Model versioning: v1 through v6, each with documented changes and honest benchmarks

The pipeline skills are real and transferable. The CPI leakage discovery is the kind of bug that costs real money in production systems. Understanding why RF fails on extrapolation, why Prophet fails on structural breaks, why deflation removes signal — these are things you only learn by building.

---

## What's Next

The honest conclusion: for monthly agricultural prices with 177 rows, deploy the naive baseline and document the finding. I'm deploying v6 (MAE 216) as the API model because it's our best honest ML model, while noting that rolling mean 3 beats it.

The next project: an agricultural AI extension worker for East Africa. Most smallholder farmers can't access extension workers. A RAG-based system trained on MAAIF Uganda crop guides, FAO manuals, and pest management bulletins could answer "my maize leaves are turning yellow, what's wrong?" in context-specific ways that generic chatbots can't.

Better data. Different problem framing. Same agricultural domain.

The code and all six notebooks are available on [GitHub](https://github.com/Byabasaija/east-africa-food-prices). The API is live at the HuggingFace model repo `byabasaija/uganda-food-prices-model`.

---

*If you're working on agricultural ML in East Africa and hitting similar data walls, I'd like to compare notes. Find me on LinkedIn.*
