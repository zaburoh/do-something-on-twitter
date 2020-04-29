function DateUtil() {
  this.date = new Date();
  this.fullYear = this.date.getFullYear();
  this.month = this.zeropad(this.date.getMonth() + 1);
  this.day = this.zeropad(this.date.getDate());
  this.hours = this.zeropad(this.date.getHours());
  this.minutes = this.zeropad(this.date.getMinutes());
}

DateUtil.prototype.formatedDate = function() {  
  return this.fullYear + '/' + this.month + '/' + this.day + ' ' + this.hours + ':' + this.minutes;
}

DateUtil.prototype.zeropad = function(str) {
  return ('0' + str).slice(-2)
}

module.exports = DateUtil;