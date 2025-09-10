export const POST_LIST = `
  query Posts($pagination: PaginationInput!) {
    posts(pagination: $pagination) {
      total
        page
        limit
        totalPages
        items {
          _id
          created_at
          updated_at
          title
          body
          location
          price
          rating
          room_type
          amenities
          isAvailable
          user {
              _id
              created_at
              updated_at
              email
              password
              role
              profile
          }
      }
    }
  }
`;