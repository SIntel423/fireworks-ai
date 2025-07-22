import {
  BellIcon,
  BookIcon,
  CodeBlockIcon,
  CogIcon,
  ComponentIcon,
  DocumentsIcon,
  EditIcon,
  ErrorOutlineIcon,
  HomeIcon,
  InsertBelowIcon,
  RedoIcon,
  TagsIcon,
  UserIcon,
} from '@sanity/icons';
import { IoIosNavigate } from 'react-icons/io';
import { IoDocuments, IoGlobeOutline } from 'react-icons/io5';
import { PiGavel } from 'react-icons/pi';
import { singletonDocumentListItem } from 'sanity-plugin-singleton-tools';

import type { StructureBuilder, StructureResolverContext } from 'sanity/structure';

const mainSitePagesMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Main Website Pages')
    .icon(DocumentsIcon)
    .child(
      S.list()
        .title('Main Website Pages')
        .items([
          S.listItem()
            .title('Home')
            .icon(HomeIcon)
            .child(S.document().schemaType('page').documentId('8e1111a8-ec31-474f-8b85-c4a4d0fcde91')),
          S.divider(),
          S.documentTypeListItem('page').title('Pages').icon(BookIcon),
        ]),
    );

const blogListingMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Blog')
    .icon(EditIcon)
    .child(
      S.list()
        .title('Blog')
        .items([
          S.listItem()
            .title('Blog Homepage')
            .icon(HomeIcon)
            .child(S.document().schemaType('page').documentId('efe9fa6e-4549-42d8-bce6-7e93a5cadfe2')),
          S.documentTypeListItem('blog').title('Blog Posts').icon(IoDocuments),
          S.documentTypeListItem('blogCategory').title('Blog Category').icon(TagsIcon),
        ]),
    );

const modelListingMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Models')
    .icon(CodeBlockIcon)
    .child(
      S.list()
        .title('Models')
        .items([
          S.listItem()
            .title('Model Listing')
            .icon(HomeIcon)
            .child(S.document().schemaType('page').documentId('8c419fbe-e088-4dba-a42f-d92a1343149b')),
          S.documentTypeListItem('model').title('Models').icon(CodeBlockIcon),
          S.documentTypeListItem('modelType').title('Model Types').icon(TagsIcon),
        ]),
    );

// const landingPageMenu = (S: StructureBuilder) =>
//   S.listItem()
//     .title('Landing Pages')
//     .icon(FaLocationDot)
//     .child(
//       S.list()
//         .title('Landing Pages')
//         .items([
//           S.documentTypeListItem('paidLandingPage'),
//           S.documentTypeListItem('meetingThankYouPage'),
//           S.documentTypeListItem('listingPage'),
//         ]),
//     );

const entitiesMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Entities')
    .icon(UserIcon)
    .child(
      S.list()
        .title('Entities')
        .items([
          S.documentTypeListItem('person').title('People'),
          S.documentTypeListItem('company').title('Companies'),
          S.documentTypeListItem('provider').title('Providers'),
          S.documentTypeListItem('testimonial').title('Testimonials'),
        ]),
    );

const contentBlocksMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Content Building Blocks')
    .icon(ComponentIcon)
    .child(
      S.list()
        .title('Content Building Blocks')
        .items([
          S.documentTypeListItem('hubspotForm').title('Hubspot Forms'),
          S.documentTypeListItem('rive').title('Rive'),
          S.documentTypeListItem('symbol').title('Symbols'),
          // S.documentTypeListItem('token').title('Tokens'),
          S.documentTypeListItem('video').title('Video'),
        ]),
    );

const globalMenu = (S: StructureBuilder, context: StructureResolverContext) =>
  S.listItem()
    .title('Global')
    .icon(IoGlobeOutline)
    .child(
      S.list()
        .title('Global')
        .items([
          singletonDocumentListItem({
            S,
            context,
            type: 'navigation',
            title: 'Navigation',
            id: 'navigation',
            icon: IoIosNavigate,
          }),
          singletonDocumentListItem({
            S,
            context,
            type: 'footer',
            title: 'Footer',
            id: 'footer',
            icon: InsertBelowIcon,
          }),
          singletonDocumentListItem({
            S,
            context,
            type: 'announcementBar',
            title: 'Announcement Bar',
            id: 'announcementBar',
            icon: BellIcon,
          }),
          singletonDocumentListItem({
            S,
            context,
            type: 'notFound',
            title: 'Not Found Page',
            id: 'notFound',
            icon: ErrorOutlineIcon,
          }),
        ]),
    );

const structure = (S: StructureBuilder, context: StructureResolverContext) =>
  S.list()
    .title('Content')
    .items([
      mainSitePagesMenu(S),
      S.divider(),
      blogListingMenu(S),
      modelListingMenu(S),
      S.documentTypeListItem('legal').title('Legal').icon(PiGavel),
      S.divider(),
      contentBlocksMenu(S),
      entitiesMenu(S),
      S.divider(),
      globalMenu(S, context),
      S.documentTypeListItem('redirect').title('Redirects').icon(RedoIcon),
      S.divider(),
      singletonDocumentListItem({
        S,
        context,
        type: 'settings',
        title: 'Site Settings',
        id: 'siteSettings',
        icon: CogIcon,
      }),
    ]);

export default structure;
