$(document).ready(function () {

    $("fieldset > label").css({
        fontSize: "18px",
        marginRight: "15px",
    });

    $("legend").css({
        fontSize: "20px",
        fontWeight: "bold",
    });

    $("input[type=checkbox]").css({
        marginRight: "10px",
        cursor: "pointer",
    });

    $("fieldset").css({
        border: "2px solid #f8d9d9ff",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "20px",
        backgroundColor: "#f9f9f9",
        textAlign: "left",
    });

    $("#accordion").accordion({ 
        heightStyle: "content",
        collapsible: true
    });

    $(".tip").css({
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: "#fff",
        textAlign: "center",
    });
});