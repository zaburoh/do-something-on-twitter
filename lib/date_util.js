function DateUtil() {
  this.date = new Date();
  this.fullYear = this.date.getFullYear();
  this.month = this.date.getMonth() + 1;
  this.day = this.date.getDate();
  this.hours = this.date.getHours();
  this.minutes = this.date.getMinutes();
}

DateUtil.prototype.formatedDate = function() {  
  return this.fullYear + '/' + this.month + '/' + this.day + ' ' + this.hours + ':' + this.minutes;
}

module.exports = DateUtil;