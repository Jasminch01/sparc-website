import { type SchemaTypeDefinition } from "sanity";
import { archiveSchema } from "./archiveSchema";
import { indiSpeak } from "./indispeakSchema";
import { ReportsPublications } from "./reports-publicationsSchema";
import { Blogs } from "./blogsSchema";
import { Research } from "./researchSchema";
import { Learn } from "./learnSchema";
import { Projects } from "./sparc-update-ProjectSchema";
import { Events } from "./sparc-update-EventSchema";
import { Highlight_Stories_Features } from "./sparc-update-HighlightNewsFeaturesSchema";
import { Partners } from "./parthnerSchema";
import { socialWorkerTeamSchema } from "./teamSchema";
import paymentMethod from "./paymentMethod";
import { Story_News } from "./story_newsSchema";

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
    Highlight_Stories_Features,
    Partners,
    socialWorkerTeamSchema,
    Story_News,
    paymentMethod

  ],
};
