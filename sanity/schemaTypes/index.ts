import { type SchemaTypeDefinition } from "sanity";
import { archiveSchema } from "./archiveSchema";
import { indiSpeak } from "./indispeakSchema";
import { ReportsPublications } from "./reports-publicationsSchema";
import { Blogs } from "./blogsSchema";
import { Research } from "./researchSchema";
import { Learn } from "./learnSchema";
import { Projects } from "./sparc-update-ProjectSchema";
import { Events } from "./sparc-update-EventSchema";
import { Partners } from "./parthnerSchema";
import { socialWorkerTeamSchema } from "./teamSchema";
import paymentMethod from "./paymentMethod";
import testimonialSchema from "./testimonialSchema";
import videoSchema from "./videoSchema";
import { fromSchema } from "./fromSchema";
import { donation } from "./DonationSchema";
import { partnershipProposal } from "./partneerShip";
import volunteer from "./volunteer";
import { fellowshipMember, fellowshipSection } from "./followshipOfTheYear";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    archiveSchema,
    indiSpeak,
    ReportsPublications,
    Blogs,
    Research,
    Learn,
    Projects,
    Events,
    Partners,
    partnershipProposal,
    videoSchema,
    volunteer,
    donation,
    fromSchema,
    socialWorkerTeamSchema,
    fellowshipSection,
    fellowshipMember,
    paymentMethod,
    testimonialSchema

  ],
};
