import { IPreferences } from "../../../wiseDisplay-api/interfaces/IApiPreferences";

export class Util {
    public static getRequestParameters(preferences: IPreferences): string {
        const params = new URLSearchParams();
      
        if (preferences.dailyOnly) {
          params.append('dates', preferences.datetime);
        }
      
        return params.toString() ? `?${params.toString()}` : '';
    }
}