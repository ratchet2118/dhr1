import { API_HOST } from "@/lib/config";
import Request from "../config/Request";
// import { transform } from '../config/interceptorHooks'

const request = new Request({
    baseURL: API_HOST,
    timeout: 5000,
    // interceptorHooks: transform,
})

export const postV1InitModelApi = async (body: any) => {
    const res = await request.post('/v1/api/contact/contact', {
        ...body
    })
    return res
}