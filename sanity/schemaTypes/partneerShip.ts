/* eslint-disable @typescript-eslint/no-explicit-any */
export const partnershipProposal = {
  name: 'partnershipProposal',
  title: 'Partnership Proposals',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'company',
      title: 'Company Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Review', value: 'in_review' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Accepted', value: 'accepted' },
          { title: 'Declined', value: 'declined' },
        ],
      },
      initialValue: 'new',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      company: 'company',
    },
    prepare(selection: any) {
      const { title, subtitle, company } = selection;
      return {
        title: `${title}${company ? ` - ${company}` : ''}`,
        subtitle: subtitle,
      };
    },
  },
};