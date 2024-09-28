const moment = require('moment');

class CommonEntity {

   public currentTime() {
      return Date.now();
   }

   public currentUtcTime() {
      return new Date().toUTCString();
   }

   public changeToNormalDataTimeString(isoDateString: String) {
      return moment(isoDateString).format('YYYY-MM-DD HH:mm:ss.SSS');
   }

   public getDateRange(status: String) {
      const currentDate = new Date();
      let fromDate, toDate;

      switch (status) {
         case 'day':
            fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
            toDate = new Date(fromDate);
            toDate.setDate(toDate.getDate() + 1); // Next day
            break;

         case 'week':
            const firstDayOfWeek = currentDate.getDate() - currentDate.getDay(); // Assuming Sunday as the first day of the week
            fromDate = new Date(currentDate.setDate(firstDayOfWeek));
            fromDate.setHours(0, 0, 0, 0); // Start of the week
            toDate = new Date(fromDate);
            toDate.setDate(toDate.getDate() + 7); // Next week
            break;

         case 'month':
            fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0);
            toDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1, 0, 0, 0); // Next month
            break;

         default:
            throw new Error("Invalid status. Use 'day', 'week', or 'month'.");
      }

      // Format dates to 'YYYY-MM-DD HH:MM:SS'
      const formatDateTime = (date: Date) => date.toISOString().replace('T', ' ').split('.')[0];

      return {
         from_date: formatDateTime(fromDate),
         to_date: formatDateTime(toDate)
      };
   }

}

export const commonEntity = new CommonEntity();
export default commonEntity;
