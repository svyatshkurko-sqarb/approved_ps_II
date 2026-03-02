import type { Merchant } from '../types/approval'

export const mockMerchants: Merchant[] = [
  {
    id: 'merchant-acme',
    name: 'Acme Holdings',
    sites: [
      {
        id: 'site-acme-1',
        domain: 'pay.acme.com',
        checkout: 'Acme Main',
        lastUpdated: '2026-02-24T09:30:00Z',
        psApprovals: [
          {
            id: 'ps-acme-1-1',
            psName: 'Stripe',
            marketApprovals: [
              {
                id: 'ps-acme-1-1-usd-us',
                geo: 'US',
                currency: 'USD',
                status: 'approved',
                submittedAt: '2026-02-21T11:10:00Z',
                comment: 'Contract signed and verified.',
              },
              {
                id: 'ps-acme-1-1-eur-de',
                geo: 'DE',
                currency: 'EUR',
                status: 'approved',
                submittedAt: '2026-02-21T12:00:00Z',
              },
            ],
          },
          {
            id: 'ps-acme-1-2',
            psName: 'Adyen',
            marketApprovals: [
              {
                id: 'ps-acme-1-2-gbp-gb',
                geo: 'GB',
                currency: 'GBP',
                status: 'pending',
                submittedAt: '2026-02-22T15:45:00Z',
                comment: 'Waiting for compliance team feedback.',
              },
              {
                id: 'ps-acme-1-2-eur-fr',
                geo: 'FR',
                currency: 'EUR',
                status: 'approved',
                submittedAt: '2026-02-22T16:30:00Z',
              },
            ],
          },
          {
            id: 'ps-acme-1-3',
            psName: 'PayPal',
            marketApprovals: [
              {
                id: 'ps-acme-1-3-usd-ca',
                geo: 'CA',
                currency: 'USD',
                status: 'draft',
                comment: 'Draft not submitted yet.',
              },
              {
                id: 'ps-acme-1-3-eur-it',
                geo: 'IT',
                currency: 'EUR',
                status: 'draft',
              },
            ],
          },
        ],
      },
      {
        id: 'site-acme-2',
        domain: 'checkout.acme.eu',
        checkout: 'Acme EU',
        lastUpdated: '2026-02-28T13:40:00Z',
        psApprovals: [
          {
            id: 'ps-acme-2-1',
            psName: 'Stripe',
            marketApprovals: [
              {
                id: 'ps-acme-2-1-usd-us',
                geo: 'US',
                currency: 'USD',
                status: 'approved',
                submittedAt: '2026-02-18T08:20:00Z',
              },
              {
                id: 'ps-acme-2-1-eur-es',
                geo: 'ES',
                currency: 'EUR',
                status: 'approved',
                submittedAt: '2026-02-18T09:10:00Z',
              },
            ],
          },
          {
            id: 'ps-acme-2-2',
            psName: 'Adyen',
            marketApprovals: [
              {
                id: 'ps-acme-2-2-eur-de',
                geo: 'DE',
                currency: 'EUR',
                status: 'approved',
                submittedAt: '2026-02-20T10:30:00Z',
              },
              {
                id: 'ps-acme-2-2-gbp-gb',
                geo: 'GB',
                currency: 'GBP',
                status: 'approved',
                submittedAt: '2026-02-20T11:15:00Z',
              },
            ],
          },
          {
            id: 'ps-acme-2-3',
            psName: 'Checkout.com',
            marketApprovals: [
              {
                id: 'ps-acme-2-3-eur-fr',
                geo: 'FR',
                currency: 'EUR',
                status: 'approved',
                submittedAt: '2026-02-23T14:00:00Z',
              },
              {
                id: 'ps-acme-2-3-usd-us',
                geo: 'US',
                currency: 'USD',
                status: 'approved',
                submittedAt: '2026-02-23T14:50:00Z',
              },
            ],
          },
        ],
      },
      {
        id: 'site-acme-3',
        domain: 'store.acme.co.uk',
        checkout: 'Acme UK',
        lastUpdated: '2026-02-25T17:05:00Z',
        psApprovals: [
          {
            id: 'ps-acme-3-1',
            psName: 'Worldpay',
            marketApprovals: [
              {
                id: 'ps-acme-3-1-gbp-gb',
                geo: 'GB',
                currency: 'GBP',
                status: 'rejected',
                submittedAt: '2026-02-19T16:15:00Z',
                comment: 'AML document is outdated.',
              },
              {
                id: 'ps-acme-3-1-eur-ie',
                geo: 'IE',
                currency: 'EUR',
                status: 'pending',
                submittedAt: '2026-02-19T17:00:00Z',
              },
            ],
          },
          {
            id: 'ps-acme-3-2',
            psName: 'PayPal',
            marketApprovals: [
              {
                id: 'ps-acme-3-2-usd-us',
                geo: 'US',
                currency: 'USD',
                status: 'pending',
                submittedAt: '2026-02-24T09:50:00Z',
              },
              {
                id: 'ps-acme-3-2-cad-ca',
                geo: 'CA',
                currency: 'CAD',
                status: 'approved',
                submittedAt: '2026-02-24T10:30:00Z',
              },
            ],
          },
          {
            id: 'ps-acme-3-3',
            psName: 'Nexi',
            marketApprovals: [
              {
                id: 'ps-acme-3-3-eur-it',
                geo: 'IT',
                currency: 'EUR',
                status: 'draft',
              },
              {
                id: 'ps-acme-3-3-eur-fr',
                geo: 'FR',
                currency: 'EUR',
                status: 'draft',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'merchant-nova',
    name: 'Nova Commerce Group',
    sites: [
      {
        id: 'site-nova-1',
        domain: 'shop.novacommerce.io',
        checkout: 'Nova Primary',
        lastUpdated: '2026-02-27T12:00:00Z',
        psApprovals: [
          {
            id: 'ps-nova-1-1',
            psName: 'Stripe',
            marketApprovals: [
              {
                id: 'ps-nova-1-1-usd-us',
                geo: 'US',
                currency: 'USD',
                status: 'approved',
                submittedAt: '2026-02-17T08:30:00Z',
              },
              {
                id: 'ps-nova-1-1-eur-nl',
                geo: 'NL',
                currency: 'EUR',
                status: 'approved',
                submittedAt: '2026-02-17T09:05:00Z',
              },
            ],
          },
          {
            id: 'ps-nova-1-2',
            psName: 'Adyen',
            marketApprovals: [
              {
                id: 'ps-nova-1-2-eur-de',
                geo: 'DE',
                currency: 'EUR',
                status: 'approved',
                submittedAt: '2026-02-18T11:00:00Z',
              },
              {
                id: 'ps-nova-1-2-gbp-gb',
                geo: 'GB',
                currency: 'GBP',
                status: 'approved',
                submittedAt: '2026-02-18T11:50:00Z',
              },
            ],
          },
          {
            id: 'ps-nova-1-3',
            psName: 'PayPal',
            marketApprovals: [
              {
                id: 'ps-nova-1-3-usd-ca',
                geo: 'CA',
                currency: 'USD',
                status: 'approved',
                submittedAt: '2026-02-19T13:40:00Z',
              },
              {
                id: 'ps-nova-1-3-eur-fr',
                geo: 'FR',
                currency: 'EUR',
                status: 'approved',
                submittedAt: '2026-02-19T14:25:00Z',
              },
            ],
          },
        ],
      },
      {
        id: 'site-nova-2',
        domain: 'checkout.novacommerce.io',
        checkout: 'Nova Express',
        lastUpdated: '2026-02-26T15:10:00Z',
        psApprovals: [
          {
            id: 'ps-nova-2-1',
            psName: 'Checkout.com',
            marketApprovals: [
              {
                id: 'ps-nova-2-1-eur-de',
                geo: 'DE',
                currency: 'EUR',
                status: 'pending',
                submittedAt: '2026-02-25T09:10:00Z',
              },
              {
                id: 'ps-nova-2-1-usd-us',
                geo: 'US',
                currency: 'USD',
                status: 'approved',
                submittedAt: '2026-02-25T09:45:00Z',
              },
            ],
          },
          {
            id: 'ps-nova-2-2',
            psName: 'Klarna',
            marketApprovals: [
              {
                id: 'ps-nova-2-2-sek-se',
                geo: 'SE',
                currency: 'SEK',
                status: 'draft',
              },
              {
                id: 'ps-nova-2-2-eur-fi',
                geo: 'FI',
                currency: 'EUR',
                status: 'draft',
              },
            ],
          },
          {
            id: 'ps-nova-2-3',
            psName: 'Worldpay',
            marketApprovals: [
              {
                id: 'ps-nova-2-3-gbp-gb',
                geo: 'GB',
                currency: 'GBP',
                status: 'approved',
                submittedAt: '2026-02-24T18:25:00Z',
              },
              {
                id: 'ps-nova-2-3-eur-ie',
                geo: 'IE',
                currency: 'EUR',
                status: 'approved',
                submittedAt: '2026-02-24T19:10:00Z',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'merchant-orbit',
    name: 'Orbit Retail Network',
    sites: [
      {
        id: 'site-orbit-1',
        domain: 'pay.orbitretail.com',
        checkout: 'Orbit Core',
        lastUpdated: '2026-02-23T10:25:00Z',
        psApprovals: [
          {
            id: 'ps-orbit-1-1',
            psName: 'Adyen',
            marketApprovals: [
              {
                id: 'ps-orbit-1-1-eur-fr',
                geo: 'FR',
                currency: 'EUR',
                status: 'rejected',
                submittedAt: '2026-02-21T08:05:00Z',
                comment: 'Legal entity mismatch in contract.',
              },
              {
                id: 'ps-orbit-1-1-eur-de',
                geo: 'DE',
                currency: 'EUR',
                status: 'pending',
                submittedAt: '2026-02-21T08:50:00Z',
              },
            ],
          },
          {
            id: 'ps-orbit-1-2',
            psName: 'Stripe',
            marketApprovals: [
              {
                id: 'ps-orbit-1-2-usd-us',
                geo: 'US',
                currency: 'USD',
                status: 'approved',
                submittedAt: '2026-02-20T13:15:00Z',
              },
              {
                id: 'ps-orbit-1-2-cad-ca',
                geo: 'CA',
                currency: 'CAD',
                status: 'approved',
                submittedAt: '2026-02-20T14:00:00Z',
              },
            ],
          },
          {
            id: 'ps-orbit-1-3',
            psName: 'PayPal',
            marketApprovals: [
              {
                id: 'ps-orbit-1-3-eur-es',
                geo: 'ES',
                currency: 'EUR',
                status: 'draft',
              },
              {
                id: 'ps-orbit-1-3-gbp-gb',
                geo: 'GB',
                currency: 'GBP',
                status: 'draft',
              },
            ],
          },
        ],
      },
      {
        id: 'site-orbit-2',
        domain: 'uk.orbitretail.com',
        checkout: 'Orbit UK',
        lastUpdated: '2026-02-28T07:55:00Z',
        psApprovals: [
          {
            id: 'ps-orbit-2-1',
            psName: 'Stripe',
            marketApprovals: [
              {
                id: 'ps-orbit-2-1-usd-us',
                geo: 'US',
                currency: 'USD',
                status: 'approved',
                submittedAt: '2026-02-22T12:10:00Z',
              },
              {
                id: 'ps-orbit-2-1-eur-ie',
                geo: 'IE',
                currency: 'EUR',
                status: 'approved',
                submittedAt: '2026-02-22T13:00:00Z',
              },
            ],
          },
          {
            id: 'ps-orbit-2-2',
            psName: 'Worldpay',
            marketApprovals: [
              {
                id: 'ps-orbit-2-2-gbp-gb',
                geo: 'GB',
                currency: 'GBP',
                status: 'pending',
                submittedAt: '2026-02-27T11:35:00Z',
              },
              {
                id: 'ps-orbit-2-2-eur-fr',
                geo: 'FR',
                currency: 'EUR',
                status: 'approved',
                submittedAt: '2026-02-27T12:05:00Z',
              },
            ],
          },
          {
            id: 'ps-orbit-2-3',
            psName: 'Nexi',
            marketApprovals: [
              {
                id: 'ps-orbit-2-3-eur-it',
                geo: 'IT',
                currency: 'EUR',
                status: 'approved',
                submittedAt: '2026-02-26T10:40:00Z',
              },
              {
                id: 'ps-orbit-2-3-eur-es',
                geo: 'ES',
                currency: 'EUR',
                status: 'approved',
                submittedAt: '2026-02-26T11:25:00Z',
              },
            ],
          },
        ],
      },
      {
        id: 'site-orbit-3',
        domain: 'de.orbitretail.com',
        checkout: 'Orbit DE',
        lastUpdated: '2026-02-20T06:20:00Z',
        psApprovals: [
          {
            id: 'ps-orbit-3-1',
            psName: 'Adyen',
            marketApprovals: [
              {
                id: 'ps-orbit-3-1-eur-de',
                geo: 'DE',
                currency: 'EUR',
                status: 'draft',
              },
              {
                id: 'ps-orbit-3-1-chf-ch',
                geo: 'CH',
                currency: 'CHF',
                status: 'draft',
              },
            ],
          },
          {
            id: 'ps-orbit-3-2',
            psName: 'Stripe',
            marketApprovals: [
              {
                id: 'ps-orbit-3-2-eur-at',
                geo: 'AT',
                currency: 'EUR',
                status: 'draft',
              },
              {
                id: 'ps-orbit-3-2-eur-be',
                geo: 'BE',
                currency: 'EUR',
                status: 'draft',
              },
            ],
          },
        ],
      },
      {
        id: 'site-orbit-4',
        domain: 'fr.orbitretail.com',
        checkout: 'Orbit FR',
        lastUpdated: '2026-02-24T14:45:00Z',
        psApprovals: [
          {
            id: 'ps-orbit-4-1',
            psName: 'Checkout.com',
            marketApprovals: [
              {
                id: 'ps-orbit-4-1-eur-fr',
                geo: 'FR',
                currency: 'EUR',
                status: 'approved',
                submittedAt: '2026-02-21T14:00:00Z',
              },
              {
                id: 'ps-orbit-4-1-usd-us',
                geo: 'US',
                currency: 'USD',
                status: 'approved',
                submittedAt: '2026-02-21T14:40:00Z',
              },
            ],
          },
          {
            id: 'ps-orbit-4-2',
            psName: 'PayPal',
            marketApprovals: [
              {
                id: 'ps-orbit-4-2-eur-fr',
                geo: 'FR',
                currency: 'EUR',
                status: 'approved',
                submittedAt: '2026-02-22T09:50:00Z',
              },
              {
                id: 'ps-orbit-4-2-eur-be',
                geo: 'BE',
                currency: 'EUR',
                status: 'approved',
                submittedAt: '2026-02-22T10:15:00Z',
              },
            ],
          },
          {
            id: 'ps-orbit-4-3',
            psName: 'Klarna',
            marketApprovals: [
              {
                id: 'ps-orbit-4-3-sek-se',
                geo: 'SE',
                currency: 'SEK',
                status: 'approved',
                submittedAt: '2026-02-23T10:20:00Z',
              },
              {
                id: 'ps-orbit-4-3-nok-no',
                geo: 'NO',
                currency: 'NOK',
                status: 'approved',
                submittedAt: '2026-02-23T11:00:00Z',
              },
            ],
          },
        ],
      },
    ],
  },
]
