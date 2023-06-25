http://localhost:3000/personas

{
	"id": 1,
	"nombre": "Juan ",
	"cedula": "10735896245",
	"apellido": "Rulfo",
	"edad": 24,
	"telefono": "31456987459"
}

INSERT INTO nodeb.Personas
(nombre, cedula, apellido, edad, telefono)
VALUES('Juan ', '10735896245', 'Rulfo', 24, '31456987459');

SELECT * FROM Personas p 


http://localhost:3000/doctores



INSERT INTO nodeb.doctores
(nombre, apellido, idespecialidad, consultorio, correo)
VALUES('Cesar', 'Inestroza', 1, '3', 'cesar@cafam.com');


INSERT INTO nodeb.especialidades
(nombreEspecialidad)
VALUES('prueba');