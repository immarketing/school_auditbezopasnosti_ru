/**
 * Created by AVGorbunov on 25.02.2016.
 */

$(document).ready(function () {
    $(".navbar").on("activate.bs.scrollspy", function () {
        var x = $(".nav li.active > a");
        //$("#demo").empty().html("You are currently viewing: " + x);
        console.log(x.text());
        console.log(x.length);

        $("a.navbar-brand").css("visibility", "visible");
    })
});
