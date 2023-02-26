import { userService } from './user.service'
import {getActionRemoveReview,getActionAddReview} from '../store/actions/review.actions'
import { httpService } from './http.service'

export const reviewService = {
    add,
    query,
    remove
}

const reviewChannel = new BroadcastChannel('reviewChannel')

function query(filterBy) {
    return httpService.get('review', filterBy)
}

async function remove(reviewId) {
    await httpService.remove('review', reviewId)
    reviewChannel.postMessage(getActionRemoveReview(reviewId))
}

async function add(review) {
    const addedReview = await httpService.post('review', review)
    return addedReview
}
