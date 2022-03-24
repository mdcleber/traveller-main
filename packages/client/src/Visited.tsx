import { Container, Heading } from '@chakra-ui/react'
import type { FC } from 'react'
import React from 'react'
import { CitiesTableFilter } from './CitiesTableFilter'

export const Visited: FC = () => {
  const filter = { visited: true }

  return (
    <>
      <Heading as="h1">Visited</Heading>
      <Container centerContent maxW="container.md" flexDir="row" data-testid="container">
        <CitiesTableFilter filter={filter} />
      </Container>
    </>
  )
}
