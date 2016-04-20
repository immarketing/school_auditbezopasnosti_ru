/**
 * Created by AVGorbunov on 20.04.2016.
 */

$(document).ready(function () {
    $("#btn1").click( function(){
        alert("Form submitted");
        $.ajax({
            url: "pi_data_json.php",
            context: document.body
        }).done(function(data) {
            alert("Form submitted 2"+data);
        });
    });
});
