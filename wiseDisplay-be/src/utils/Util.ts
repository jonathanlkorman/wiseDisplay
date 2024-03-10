import { IPreferences } from "../../../wiseDisplay-api/interfaces/IApiPreferences";

export class Util {
    public static getRequestParameters(preferences: IPreferences): string {
        const params = new URLSearchParams();
      
        if (preferences.dailyOnly) {
          params.append('dates', this.formatDate(preferences.datetime));
        }
      
        return params.toString() ? `?${params.toString()}` : '';
    }

	public static formatDate(datetime: string): string {
		const date =  new Date(datetime);
		const year = date.getFullYear();
    	const month = String(date.getMonth() + 1).padStart(2, '0');
    	const day = String(date.getDate()).padStart(2, '0');

    	return `${year}${month}${day}`;
	}
}