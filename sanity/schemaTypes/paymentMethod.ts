/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'paymentMethod',
  title: 'Payment Method',
  type: 'document',
  fields: [
    defineField({
      name: 'paymentType',
      title: 'Payment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Bank Transfer', value: 'bankTransfer' },
          { title: 'Mobile Banking', value: 'mobileBanking' },
          { title: 'International Payment (PayPal)', value: 'paypal' }
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    }),

    // Bank Transfer Fields
    defineField({
      name: 'accountName',
      title: 'Account Name',
      type: 'string',
      description: 'Your Name / Company Name',
      hidden: ({ document }) => document?.paymentType !== 'bankTransfer',
      validation: Rule => Rule.custom((value, context) => {
        const paymentType = (context.document as any)?.paymentType
        if (paymentType === 'bankTransfer' && !value) {
          return 'Account name is required for bank transfer'
        }
        return true
      })
    }),

    defineField({
      name: 'bankName',
      title: 'Bank Name',
      type: 'string',
      placeholder: 'Example Bank Ltd',
      hidden: ({ document }) => document?.paymentType !== 'bankTransfer',
      validation: Rule => Rule.custom((value, context) => {
        const paymentType = (context.document as any)?.paymentType
        if (paymentType === 'bankTransfer' && !value) {
          return 'Bank name is required for bank transfer'
        }
        return true
      })
    }),

    defineField({
      name: 'branchName',
      title: 'Branch Name',
      type: 'string',
      placeholder: 'Gulshan Branch',
      hidden: ({ document }) => document?.paymentType !== 'bankTransfer',
      validation: Rule => Rule.custom((value, context) => {
        const paymentType = (context.document as any)?.paymentType
        if (paymentType === 'bankTransfer' && !value) {
          return 'Branch name is required for bank transfer'
        }
        return true
      })
    }),

    defineField({
      name: 'accountNumber',
      title: 'Account Number',
      type: 'string',
      placeholder: '123456789',
      hidden: ({ document }) => document?.paymentType !== 'bankTransfer',
      validation: Rule => Rule.custom((value, context) => {
        const paymentType = (context.document as any)?.paymentType
        if (paymentType === 'bankTransfer' && !value) {
          return 'Account number is required for bank transfer'
        }
        return true
      })
    }),

    defineField({
      name: 'swiftCode',
      title: 'SWIFT Code',
      type: 'string',
      placeholder: 'EXAMPKXXX',
      hidden: ({ document }) => document?.paymentType !== 'bankTransfer',
      validation: Rule => Rule.custom((value, context) => {
        const paymentType = (context.document as any)?.paymentType
        if (paymentType === 'bankTransfer' && !value) {
          return 'SWIFT code is required for bank transfer'
        }
        return true
      })
    }),

    defineField({
      name: 'routingNumber',
      title: 'Routing Number',
      type: 'string',
      placeholder: '123456789',
      hidden: ({ document }) => document?.paymentType !== 'bankTransfer',
      validation: Rule => Rule.custom((value, context) => {
        const paymentType = (context.document as any)?.paymentType
        if (paymentType === 'bankTransfer' && !value) {
          return 'Routing number is required for bank transfer'
        }
        return true
      })
    }),

    // Mobile Banking Fields
    defineField({
      name: 'mobileProvider',
      title: 'Mobile Banking Provider',
      type: 'string',
      options: {
        list: [
          { title: 'bKash', value: 'bkash' },
          { title: 'Nagad', value: 'nagad' },
          { title: 'Upay', value: 'upay' },
          { title: 'Rocket', value: 'rocket' }
        ]
      },
      hidden: ({ document }) => document?.paymentType !== 'mobileBanking',
      validation: Rule => Rule.custom((value, context) => {
        const paymentType = (context.document as any)?.paymentType
        if (paymentType === 'mobileBanking' && !value) {
          return 'Mobile provider is required for mobile banking'
        }
        return true
      })
    }),

    defineField({
      name: 'mobileAccountNumber',
      title: 'Mobile Account Number',
      type: 'string',
      placeholder: '01XXXXXXXXX',
      hidden: ({ document }) => document?.paymentType !== 'mobileBanking',
      validation: Rule => Rule.custom((value, context) => {
        const paymentType = (context.document as any)?.paymentType
        if (paymentType === 'mobileBanking' && !value) {
          return 'Mobile account number is required for mobile banking'
        }
        return true
      })
    }),

    // PayPal Fields
    defineField({
      name: 'paypalEmail',
      title: 'PayPal Email',
      type: 'string',
      placeholder: 'example@email.com',
      hidden: ({ document }) => document?.paymentType !== 'paypal',
      validation: Rule => Rule.custom((value, context) => {
        const paymentType = (context.document as any)?.paymentType
        if (paymentType === 'paypal' && !value) {
          return 'PayPal email is required for international payment'
        }
        if (paymentType === 'paypal' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address'
        }
        return true
      })
    }),


  ],

  preview: {
    select: {
      paymentType: 'paymentType',
      bankName: 'bankName',
      mobileProvider: 'mobileProvider',
      paypalEmail: 'paypalEmail'
    },
    prepare(selection) {
      const { paymentType, bankName, mobileProvider, paypalEmail } = selection
      
      let title = 'Payment Method'
      let subtitle = ''

      if (paymentType === 'bankTransfer') {
        title = 'Bank Transfer'
        subtitle = bankName || 'No bank selected'
      } else if (paymentType === 'mobileBanking') {
        title = 'Mobile Banking'
        subtitle = mobileProvider || 'No provider selected'
      } else if (paymentType === 'paypal') {
        title = 'PayPal'
        subtitle = paypalEmail || 'No email provided'
      }

      return {
        title,
        subtitle
      }
    }
  }
})