import { defineType, defineField } from 'sanity';

export const donation = defineType({
  name: 'donation',
  title: 'Donations',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Donor Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'transactionId',
      title: 'Transaction ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: [
          { title: 'Mobile Banking', value: 'mobileBanking' },
          { title: 'Bank Transfer', value: 'bankTransfer' },
          { title: 'PayPal', value: 'paypal' },
        ],
      },
    }),
    defineField({
      name: 'paymentProvider',
      title: 'Payment Provider',
      type: 'string',
    }),
    defineField({
      name: 'honoreeName',
      title: 'Honoree Name',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
    defineField({
      name: 'bankName',
      title: 'Bank Name',
      type: 'string',
    }),
    defineField({
      name: 'branchName',
      title: 'Branch Name',
      type: 'string',
    }),
    defineField({
      name: 'referenceNumber',
      title: 'Reference Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'paypalTransactionId',
      title: 'PayPal Transaction ID',
      type: 'string',
    }),
    defineField({
      name: 'selectedMobileAccount',
      title: 'Mobile Account',
      type: 'string',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Verified', value: 'verified' },
          { title: 'Completed', value: 'completed' },
          { title: 'Rejected', value: 'rejected' },
        ],
      },
      initialValue: 'pending',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'transactionId',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      return {
        title: title || 'Anonymous',
        subtitle: `${subtitle} - ${status}`,
      };
    },
  },
});