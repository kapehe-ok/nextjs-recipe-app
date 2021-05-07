import client from '@sanity/client'
import {
  createPreviewSubscriptionHook,
  createImageUrlBuilder,
  createPortableTextComponent
} from 'next-sanity'

const config = {
  projectId: '44jch7am',
  dataset: 'production',
  apiVersion: '2021-03-25',
  useCdn: true
}

// TODO: Replace this with built in next-sanity client once the new version is out
export const sanityClient = client(config)

// Create a preview subscription hook with the current config
export const usePreviewSubscription = createPreviewSubscriptionHook(config)

// Create a urlFor function that we can use for assets in the codebase
export const urlFor = source => createImageUrlBuilder(config).image(source)

// Create a PortableText component. We use the stock config so no serializers are necessary
export const PortableText = createPortableTextComponent({
  ...config,
  serializers: {}
})
