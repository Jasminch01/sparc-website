import type { StructureResolver } from "sanity/structure";
import {
  BookIcon,
  DocumentIcon,
  ArchiveIcon,
  SearchIcon,
  CalendarIcon,
  FolderIcon,
} from "@sanity/icons";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Stories folder
      S.listItem()
        .title("STORIES")
        .icon(BookIcon as unknown as React.ComponentType)
        .child(
          S.list()
            .title("STORIE'S")
            .items([
              // Indispeak category
              S.listItem()
                .title("Indispeak")
                .icon(DocumentIcon as unknown as React.ComponentType)
                .child(
                  S.documentTypeList("indispeakStories").title(
                    "Indispeak Stories"
                  )
                ),

              // SPARC Update category
              S.listItem()
                .title("SPARC Update")
                .icon(FolderIcon as unknown as React.ComponentType)
                .child(
                  S.list()
                    .title("SPARC Update")
                    .items([
                      S.listItem()
                        .title("Events")
                        .icon(CalendarIcon as unknown as React.ComponentType)
                        .child(S.documentTypeList("events").title("Events")),
                      S.listItem()
                        .title("Projects")
                        .icon(FolderIcon as unknown as React.ComponentType)
                        .child(
                          S.documentTypeList("projects").title("Projects")
                        ),
                    ])
                ),
            ])
        ),

      // Resources folder
      S.listItem()
        .title("RESOURCES")
        .icon(ArchiveIcon as unknown as React.ComponentType)
        .child(
          S.list()
            .title("RESOURCES")
            .items([
              S.listItem()
                .title("Reports")
                .icon(DocumentIcon as unknown as React.ComponentType)
                .child(S.documentTypeList("reports").title("Reports")),
              S.listItem()
                .title("Archive")
                .icon(ArchiveIcon as unknown as React.ComponentType)
                .child(S.documentTypeList("archive").title("Archive")),
              S.listItem()
                .title("Research")
                .icon(SearchIcon as unknown as React.ComponentType)
                .child(S.documentTypeList("research").title("Research")),
            ])
        ),
      // Resources folder
      S.listItem()
        .title("FORM COLLECTION DATA")
        .icon(ArchiveIcon as unknown as React.ComponentType)
        .child(
          S.list()
            .title("FORM COLLECTION DATA")
            .items([
              S.listItem()
                .title("Partnership Proposals")
                .icon(DocumentIcon as unknown as React.ComponentType)
                .child(S.documentTypeList("partnershipProposal").title("Partnership Proposals")),
              S.listItem()
                .title("Donations")
                .icon(ArchiveIcon as unknown as React.ComponentType)
                .child(S.documentTypeList("donation").title("Donations")),
              S.listItem()
                .title("Volunteer Applications")
                .icon(SearchIcon as unknown as React.ComponentType)
                .child(S.documentTypeList("volunteer").title("Volunteer Applications")),
            ])
        ),

      // All other document types
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "indispeakStories",
            "events",
            "highlights",
            "projects",
            "reports",
            "archive",
            "research",
            "volunteer",
            "donation",
            "partnershipProposal",
          ].includes(listItem.getId() || "")
      ),
    ]);
