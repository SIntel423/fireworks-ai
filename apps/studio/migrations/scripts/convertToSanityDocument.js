import { htmlToBlocks } from '@portabletext/block-tools';
import { JSDOM } from 'jsdom';

import client from '../lib/client.js';
import { blockContentType } from '../scripts/convertHTMLtoPortableText.js';

const PROVIDERS = {
  '01-ai': '5cf2da3c-a668-4b43-a5a8-c2fbe3c42c53',
  Austism: '2cde5a9d-c49d-4ce0-b015-c0bcf29484bd',
  bigcode: '2674346a-9487-43a9-a40a-7a0d47097d15',
  'black-forest-labs': 'b8388bc9-0f74-4b95-a4bc-2bad9009bfb0',
  codellama: 'a82089a3-c80d-4272-9c66-791ca9f5c413',
  cognitivecomputations: '77419c65-0336-4e78-bec3-7319135a780b',
  databricks: '5546e3a6-ea37-43b1-9240-745f7a2d8d66',
  'deepseek-ai': 'baaf79bf-7cb5-4c43-963b-ac1771d32c0d',
  EleutherAI: 'e7e35925-b1ae-4068-ab25-390c384fc95a',
  'fireworks-ai': '61da44fb-7794-4aef-9eb7-2061f6465566',
  google: '9bdd45d7-2e93-475f-ab45-0b139ffdeb60',
  Gryphe: 'a449703c-2724-4a3a-8768-4eedcb7eaa81',
  HuggingFaceH4: '1bdede18-5d2d-4d78-8299-9bc4ce9a141f',
  'llava-hf': 'dd70f823-0458-4cc6-8512-50c22ac1180f',
  'meta-llama': 'a82089a3-c80d-4272-9c66-791ca9f5c413',
  microsoft: '56b3b68f-7ba1-4ee7-a3ee-6341c42f0f33',
  mistralai: '95b6aa06-f2f0-4a9f-82a7-11572157e19a',
  NousResearch: 'b60bee39-ad15-4e57-84b1-89ef59fa3746',
  openai: '763db0b7-4a05-485d-b47e-d4ec6037b011',
  openchat: '73582070-15e9-4ce8-bfbf-9c3cdc4e22bf',
  'Open-Orca': '94c93e28-f5c1-45dc-aaff-adaf2483ed5e',
  Phind: '2f13935e-2c3e-4b5c-b610-a9913c14e8e2',
  Qwen: '45eff8fc-8880-4602-aaf0-d378a832bc33',
  segmind: 'f4c2dcae-44c6-4d08-975d-b3b39949a8bf',
  SentientAGI: '38269918-d0a4-437d-9375-05e54db7a060',
  snorkelai: '30928c49-5c91-4f51-9414-bfc1fa77e05b',
  stabilityai: '1fa06a59-0f28-4478-948c-6b30b48501de',
  teknium: '179b6950-5d7b-4b6d-abe9-527fe877106b',
  Undi95: 'd4af3b3f-2927-4e31-bf32-469c45f5cfaf',
};

const TYPES = {
  llm: '7e2d6afb-7440-451c-8b66-e7da6a0ca3a3',
  audio: '6ad0564e-4e2c-4ee7-b9e8-021c2a891cac',
  image: '61f015a1-3cf2-4953-bbe9-425882fd1ca0',
};

const getType = tags => {
  switch (true) {
    case tags.includes('Audio'):
      return TYPES.audio;
    case tags.includes('Image'):
      return TYPES.image;
    case tags.includes('LLM'):
      return TYPES.llm;
    default:
      return null;
  }
};

const costGenerator = cost => {
  if ('inputTokenPrice' in cost) {
    return {
      pricingInput: cost.inputTokenPrice,
      pricingOutput: cost.outputTokenPrice,
      pricingUnit: 'million',
    };
  }

  if ('stepPrice' in cost) {
    return {
      pricingInput: cost.stepPrice,
      pricingOutput: cost.stepPrice,
      pricingUnit: 'step',
      collapsePricing: true,
    };
  }

  if ('unitPrice' in cost) {
    return {
      pricingInput: cost.unitPrice,
      pricingOutput: cost.unitPrice,
      pricingUnit: 'image',
      collapsePricing: true,
    };
  }

  return {
    pricingInput: 0,
    pricingOutput: 0,
    pricingUnit: 'million',
    collapsePricing: true,
  };
};

const COLORS = ['blue', 'green', 'red', 'yellow'];

const convertToSanityDocument = async (
  { title, id, description, link, cost, tags, provider, contextLength, tunable },
  ind,
) => {
  const exitingRecord = await client.fetch(`*[_type == "model" && modelName == "${title}"][0]`),
    _id = exitingRecord?._id || id;

  const doc = {
    _type: 'model',
    _id,
    modelName: title,
    description: htmlToBlocks(`<span>${description}</span>`, blockContentType, {
      parseHtml: excerpt => new JSDOM(excerpt).window.document,
    }),
    modelLink: {
      type: 'link',
      link: {
        href: link,
      },
    },
    provider: provider?.hf
      ? {
          _type: 'reference',
          _ref: provider?.hf ? PROVIDERS[provider.hf] : '',
        }
      : undefined,
    modelType: getType(tags)
      ? {
          _type: 'reference',
          _ref: getType(tags),
        }
      : undefined,
    contextLength: contextLength ? String(contextLength) : null,
    serverless: tags.includes('Serverless'),
    fineTuning: tunable,
    onDemandDeployment: true,
    new: tags.includes('New'),
    featured: false,
    color: COLORS[ind % COLORS.length],

    // Pricing is odd. Looks like for most there is an input and output but does not denote unit. I have seen 0 for input and output but there is a token price that has a value. Some just have `tokenPrice`. What do I do with the ones that have `0` for tokenPrice and stepPrice?
    ...costGenerator(cost),

    features: [
      ...(tunable
        ? [
            {
              icon: 'wrench',
              label: 'Fine-tuning',
              description: `${title} can be customized with your data to improve responses. Fireworks uses LoRA to efficiently train and deploy your personalized model`,
              link: {
                type: 'link',
                link: { href: 'https://fireworks.ai/docs/fine-tuning/fine-tuning-models' },
              },
            },
          ]
        : []),
      ...(tags.includes('Serverless')
        ? [
            {
              icon: 'upload-cloud',
              label: 'Serverless',
              description: 'Immediately run model on pre-configured GPUs and pay-per-token',
              link: { type: 'link', link: { href: 'https://docs.fireworks.ai/getting-started/quickstart' } },
            },
          ]
        : []),
      {
        icon: 'rocket',
        label: 'On-demand Deployment',
        description: `On-demand deployments give you dedicated GPUs for ${title} using Fireworks' reliable, high-performance system with no rate limits.`,
        link: { type: 'link', link: { href: 'https://fireworks.ai/docs/guides/ondemand-deployments' } },
      },
    ],

    seo: {
      pageTitle: title,
      slug: { current: id },
      pageDescription: description,
      noIndex: false,
      noFollow: false,
    },
  };

  return doc;
};

export default convertToSanityDocument;
