import type { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import { roboto } from "@/app/fonts";
import Header from "@/components/layout/header";
import SideBar from "@/components/layout/side-bar";
import Hello from "@/components/hello";
import { ProgressBar } from "@/components/progress-bar";
import { WebVitals } from "@/components/web-vitals";
import config from "@/config";

import "@/app/globals.css";

const {
  title,
  description,
  author,
  keywords,
  googleAnalyticId,
  googleTagManagerId,
  openGraph,
  about,
  avatar,
  status,
  navigationLinks,
  siteURL,
} = config;

const { firstName, lastName, middleName, preferredName } = about;

export const metadata: Metadata = {
  title: title,
  description: description,
  authors: [{ name: author }],
  creator: author,
  keywords: keywords,
  openGraph: {
    url: openGraph.url,
    type: "website",
    siteName: openGraph.siteName,
    title: openGraph.title,
    description: openGraph.description,
    images: openGraph.images,
  },
  manifest: "/manifest.json",
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: "https://unsplash.com/photos/black-remote-control-on-red-table-6sAl6aQ4OWI",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/logo.jpg",
        sizes: "192x192",
        type: "image/jpeg",
      },
    ],
  },
};

const addJsonLd = () => {
  return {
    __html: `{
      "@context": "http://schema.org",
      "@type": "Person",
      "@id": "${siteURL}#person",
      "givenName": ${firstName},
      "familyName": ${lastName},
      "additionalName": ${preferredName},
      "gender": "male",
      "birthPlace": "Uganda",
      "nationality": "Uganda",
      "jobTitle": "Software Engineer",
      "skills": "Software Engineering, Web Development",
      "image": "",
      "url": ${siteURL},
      "sameAs": [
        "https://www.linkedin.com/in/pascal-byabasaija/",
        "http://github.com/Byabasaija",
        "https://medium.com/@pascalbyabasaija",
      ]
    }
  `,
  };
};

function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.className}`}>
      <WebVitals gaId={googleAnalyticId} />
      <body>
        <ProgressBar className="fixed top-0 h-1 bg-vegas-gold">
          <Hello />
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
      </body>
      <GoogleAnalytics gaId={googleAnalyticId} />
      <GoogleTagManager gtmId={googleTagManagerId} />
    </html>
  );
}

export default RootLayout;
