/*
https://docs.nestjs.com/providers#services
*/

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class WeatherService {
    constructor(
        private readonly httpService: HttpService
    ) { }

    async getWeather(): Promise<any> {
        try {
            const apiKey: string = process.env.WEATHER_API_KEY
            const apiUrl = 'http://apis.data.go.kr/1360000/MidFcstInfoService/getMidFcst'
            const baseDate = '20220101'
            const baseTime = '0600'

            const response = await axios.get(apiUrl, {
                params: {
                    ServiceKey: apiKey,
                    pageNo: 1,
                    numOfRows: 10,
                    stnId: 109,
                    tmFc: 202402070600,
                    // dataType: 'JSON',
                }
            }
            )
            // return response
            // for (let i = 0; i < 10; i++) {
            return JSON.stringify(response.data)
            // }
        }
        catch (error) {
            console.log('error: ', error);
        }
    }
}
