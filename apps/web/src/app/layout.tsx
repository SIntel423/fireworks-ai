import { GoogleTagManager } from '@next/third-parties/google';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity';
import { twJoin } from 'tailwind-merge';

import { Aspekta, Favorit } from 'assets/fonts';

import AnnouncementBar from 'global/announcementBar';
import Footer from 'global/footer';
import Header from 'global/navigation';

import { SITE_NAME } from 'constants/general';

import 'theme/global.css';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const draft = await draftMode();

  return (
    <html lang="en">
      <head>
        <GoogleTagManager gtmId="GTM-M38TSS9H" />
        <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
      </head>
      <body className={twJoin(Aspekta.variable, Favorit.variable)}>
        <AnnouncementBar />
        <Header />
        {children}
        <Footer />
      </body>
      {draft.isEnabled ? <VisualEditing /> : null}
    </html>
  );
};

export default RootLayout;
