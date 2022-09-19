import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

<Box padding='6' boxShadow='lg' bg='white'>
  <SkeletonCircle size='10' />
  <SkeletonText mt='4' noOfLines={4} spacing='4' />
</Box>