import announcementBar from '@/schemas/documents/announcementBar';
import blog from '@/schemas/documents/blog';
import blogCategory from '@/schemas/documents/blogTags';
import { company } from '@/schemas/documents/company';
import footer from '@/schemas/documents/footer';
import { hubspotForm } from '@/schemas/documents/hubspotForms';
import legal from '@/schemas/documents/legal';
import model from '@/schemas/documents/model';
import navigation from '@/schemas/documents/navigation';
import notFound from '@/schemas/documents/notFound';
import page from '@/schemas/documents/page';
import { person } from '@/schemas/documents/person';
import provider from '@/schemas/documents/provider';
import redirect from '@/schemas/documents/redirect';
import rive from '@/schemas/documents/rive';
import siteSettings from '@/schemas/documents/settings';
import symbol from '@/schemas/documents/symbol';
import testimonial from '@/schemas/documents/testimonials';
import video from '@/schemas/documents/video';
import imageCard from '@/schemas/fields/cards/image';
import modelType from '../schemas/documents/modelType';

const fields = [imageCard] as const,
  documents = [
    announcementBar,
    blog,
    blogCategory,
    company,
    footer,
    hubspotForm,
    legal,
    model,
    modelType,
    navigation,
    notFound,
    page,
    person,
    provider,
    rive,
    redirect,
    siteSettings,
    symbol,
    testimonial,
    video,
  ] as const;

const schemas = [...fields, ...documents];

export default schemas;
