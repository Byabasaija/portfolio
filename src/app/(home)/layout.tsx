import Script from "next/script";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import { roboto } from "@/app/fonts";
import Header from "@/components/layout/header";
import SideBar from "@/components/layout/side-bar";
import Hello from "@/components/hello";
import { ProgressBar } from "@/components/progress-bar";
import { WebVitals } from "@/components/web-vitals";
import config from "@/config";

import type { Metadata } from "next";
import type { JsonLdHtml } from "@/types/json-ld";
import { Analytics } from "@vercel/analytics/next"

import "@/app/globals.css";

const {
  googleAnalyticId,
  googleTagManagerId,
  about,
  avatar,
  status,
  navigationLinks,
  jsonLdPerson,
  homeMetaData,
} = config;

const { firstName, lastName, middleName, preferredName } = about;

export const metadata: Metadata = homeMetaData;

const addJsonLd = (): JsonLdHtml => {
  return {
    __html: JSON.stringify(jsonLdPerson, null, 2),
  };
};

function HomeLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <WebVitals gaId={googleAnalyticId} />
      <body>
        <ProgressBar className="fixed top-0 h-1 bg-vegas-gold">
          
          <main>
            <SideBar
              avatar={avatar}
              firstName={firstName}
              lastName={lastName}
              middleName={middleName}
              preferredName={preferredName}
              status={status}
            />
            <div className="main-content">
              <Header navigationLinks={navigationLinks} />
              {children}
            </div>
          </main>
        </ProgressBar>
        <Script
          id="application/ld+json"
          type="application/ld+json"
          dangerouslySetInnerHTML={addJsonLd()}
          key="byabasaija-website-jsonld"
        />
      <Analytics />
      </body>
      <GoogleAnalytics gaId={googleAnalyticId} />
      <GoogleTagManager gtmId={googleTagManagerId} />
    </html>
  );
}

export default HomeLayout;
