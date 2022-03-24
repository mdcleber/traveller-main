import { Container, Heading } from '@chakra-ui/react'
import type { FC } from 'react'
import React from 'react'
import { CitiesTableFilter } from './CitiesTableFilter'

export const WishList: FC = () => {
  const filter = { wishlist: true }
  return (
    <>
      <Heading as="h1">Wish list</Heading>
      <Container centerContent maxW="container.md" flexDir="row" data-testid="container">
        <CitiesTableFilter filter={filter} />
      </Container>
    </>
  )
}
