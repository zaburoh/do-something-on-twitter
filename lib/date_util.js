function DateUtil() {
  this.date = new Date();
  this.fullYear = this.date.getFullYear();
  this.month = this.zeropad(this.date.getMonth() + 1);
  this.day = this.zeropad(this.date.getDate());
  this.hours = this.zeropad(this.date.getHours());
  this.minutes = this.zeropad(this.date.getMinutes());
  this.seconds = this.zeropad(this.date.getSeconds());
}

DateUtil.prototype.formatedDate = function() {  
  return this.fullYear + '/' + this.month + '/' + this.day + ' ' + this.hours + ':' + this.minutes;
}

DateUtil.prototype.zeropad = function(str) {
  return ('0' + str).slice(-2)
}

DateUtil.prototype.untilNowForTwitter = function(date) {
  return this.fullYear + '-' + this.month + '-' + this.day + '_' + this.hours + ':' + this.minutes + ':' + this.seconds + '_JST';
}

DateUtil.prototype.sinceTodayForTwitter = function(date) {
  return this.fullYear + '-' + this.month + '-' + this.day + '_' + '00' + ':' + '00' + ':' + '00' + '_JST';
}



module.exports = DateUtil;