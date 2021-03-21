<?php
$servername = "localhost";
$username = "root";
$password = "";
$db="baza";
if (isset($_GET['user']) && isset($_GET['pass']))
{

    echo "ABC";
    $user = $_GET['user'];
    $password = $_GET['pass'];

// Create connection
    $conn = mysqli_connect($servername, $username, $password, $db);

// Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }


    $sql = "SELECT * from donor where registarski_broj='" . $user . "' and lozinka='" . $password . "'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_assoc()) {
            echo "<div id='profileDiv' style='display: flex; flex-direction: row;justify-content: center; align-content: center; align-items: center'>";
            echo "<div style='display: flex; flex-direction: column; justify-content: center;align-items: center; margin: 30px 30px 30px 30px'>";
            echo "<label class='labelStyle' for='txtName'>Ime:</label>";
            echo "<input class='inputStyle' id='txtName' type='text' disabled='true' value='" . $row["ime"] . "'>";
            echo "<label class='labelStyle' for='txtLastName'>Prezime:</label>";
            echo "<input class='inputStyle' id='txtLastName' type='password' disabled='true' value='" . $row["prezime"] . "'>";
            echo "<label class='labelStyle' for='txtUser'>Korisničko ime:</label>";
            echo "<input class='inputStyle' id='txtUser' type='text' disabled='true' value='" . $row["registarski_broj"] . "'>";
            echo "<label class='labelStyle' for='txtPass'>Lozinka:</label>";
            echo "<input class='inputStyle' id='txtPass' type='text' disabled='true' value='" . $row["lozinka"] . "'>";
            echo "<div> <input type='checkbox' onclick='showPassword()' disabled='true'>Prikaži šifru</div>";
            echo "</div>";
            echo "</div>";
        }
        setcookie("wrong", 0, time() - 3600, "/");
    } else {
        setcookie("wrong", 1, time() + 86400, "/");

    }
    $conn->close();

}

?>

