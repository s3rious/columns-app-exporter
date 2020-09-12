import { fetchGQL } from "./fetchGQL.ts";

type Attachment = {
  type: string,
  url: string,
  title: string,
  extension: string,
}

type Comment = {
  body: string,
  attachments: Attachment[],
}

type CommentEdge = {
  node: Comment[]
}

type CommentConnection = {
  edges: CommentEdge[]
}

type Card = {
  title: string,
  cardsStyle: string,
  checkedState: number,
  color: string,
  dueAt?: string,
  attachments: Attachment[],
  comments: CommentConnection[],
}

type CardBoardItem = {
  position: number,
  node: Card,
}

type List = {
  title: string,
  description: string,
  cardItems: CardBoardItem[]
}

type ListBoardItem = {
  position: number,
  node: CardBoardItem[],
}

type Board = {
  title: string,
  description: string,
  position: number,
  color: string,
  items: ListBoardItem[],
}

type Project = {
  boards: Board[],
}

type User = {
  projects: Project[]
}

type Root = {
  currentUser: User,
}

type Request = {
  data: Root,
}

const fetchProjects = async (accessToken: string): Promise<Project[]> => {
  const request: Request = await fetchGQL(
    `
      fragment AttachmentFragment on Attachment {
        type
        url
        title
        extension
      }

      fragment CommentFragment on Comment {
        body
        attachments {
          ...AttachmentFragment
        }
      }

      fragment CommentEdgeFragment on CommentEdge {
        node {
          ...CommentFragment
        }
      }
      
      fragment CommentConnectionFragment on CommentConnection {
        edges {
          ...CommentEdgeFragment
        }
      }

      fragment CardFragment on Card {
        title
        cardsStyle
        checkedState
        color
        dueAt
        attachments {
          ...AttachmentFragment
        }
        comments {
          ...CommentConnectionFragment
        }
      }

      fragment CardBoardItemFragment on CardBoardItem {
        position
        node {
          ...CardFragment
        }
      }

      fragment ListFragment on List {
        title
        description
        cardItems {
          ...CardBoardItemFragment
        }
      }

      fragment ListBoardItemFragment on ListBoardItem {
        position
        node {
          ...ListFragment
        }
      }

      fragment BoardItemFragment on Board {
        title
        description
        position
        color
        items {
          ...ListBoardItemFragment
        }
      }

      fragment BoardsListFragment on Project {
        boards(searchQuery: $query) {
          ...BoardItemFragment
        }
      }
      
      fragment WorkspacesListFragment on User {
        projects(searchQuery: $query) {
          ...BoardsListFragment
        }
      }

      query UserProjectsQuery($query: String = "") {
        currentUser {
          ...WorkspacesListFragment
        }
      }
    `,
    accessToken,
    {
      query: '',
    },
    'UserProjectsQuery',
  )

  return request.data.currentUser.projects
}

export { fetchProjects }
