$(document).ready(function() {
  var userlist = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "brunofin", "comster404", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var logininfo, ChannelName, API, API2, stream, logo, url, closed, results, message, ClosedUser, streamData, game, status, i;

  for (i in userlist) {
    $.getJSON('https://api.twitch.tv/kraken/streams/' + userlist[i] + '?callback=?', function(data) {

      closed = data["status"];
      message = data["message"];
      stream = data["stream"];

      if (closed == 422) {
        results = message.replace(/\'/g, "");
        results = results.match(/("[^"]+"|[^"\s]+)/g);

        for (var y in results) {
          if (userlist.indexOf(results[y]) > 0) {
            ClosedUser = results[y];
          }
        }

        $(".message").append("<div class='closed'><img class='image' src=https://pbs.twimg.com/profile_images/515991247077789696/f37XqNDK.jpeg><h4 id='terminate'>" + ClosedUser + "</h4><h4 class='closedstatus'>Account Closed</h4></div>");

      } //ACCOUNT CLOSED

      API = data["_links"]["self"];
      API2 = data["_links"]["channel"];

      if (stream !== null) {
        $.getJSON(API, function(response) {
          streamData = response["stream"]["channel"];
          logo = streamData["logo"];
          ChannelName = streamData["display_name"];
          url = streamData["url"];
          game = streamData["game"];
          status = streamData["status"];
          $(".message").prepend("<div class='Online'><img class='image' src=" + logo + "><h4><a target='_blank' href=" + url + ">" + ChannelName + "</a></h4><h4 ><a class='onlinestatus' href=" + url + ">" + game + ":" + status + "</a></h4></div>");

        }); //STREAM INFO Deeper
      } // if USER ONLINE
      if (stream == null) {
        $.getJSON(API2, function(NotLive) {
          ChannelName = NotLive["display_name"];
          logo = NotLive["logo"];
          url = NotLive["url"];
          $(".message").append("<div class='Offline'><img  class='image' src=" + logo + ">" + "<h4><a target='_blank'  href=" + url + ">" + ChannelName + "</a></h4>" + "<h4 class='offlinestatus'>Offline</h4></div>");
        });
      } //if USER OFFLINE

    }); // 1st JSON call

  } // For Loop

});
