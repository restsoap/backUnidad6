Para el BackEnd se utilizarón las siguientes tecnologias

- El ORM de sequelize en la versión 6.32.0

- Express en la versión 4.18.2

- MySQL en la versión 5.7

La estructura del proyecto es: 

- config
- models
- routes

para la instalacion se deben bajar los node modules con: npm i 

	- Funcionamiento

1- se debe crear una base de datos llamada nodeb
2- se debe iniciar primero el backend para que cree las tablas automaticamente, 
    Para iniciar el servidor del backend se usa el siguiente comando:

	npx ts-node index.ts

3- registrar una Especialidad en la base de datos

	INSERT INTO nodeb.especialidades
	(nombreEspecialidad)
	VALUES('Cardiología');

los endpoints del backend son: 

___________________________________________________________________________

	Especialidades

[Especialidades](http://localhost:3000/api/especialidades)

para crear una especialidad es el mismo endpoint solo que se usa este cuerpo en el json:

{
	"nombreEspecialidad": "prueba"
}

___________________________________________________________________________

	Doctores

Luego de crear una especialidad se crea un doctor para poder asignar la especialidad

Endpoint para doctores 
[Especialidad](http://localhost:3000/api/doctores)


para postear un Doctor se usa el mismo endpoint, el cuerpo en el json es: 

{
	"nombre": "Cesar",
	"apellido": "Inestroza",
	"idespecialidad": 1,
	"consultorio": "3",
	"correo": "cesar@cafam.com"
}

al crear un doctor se valida si el correo ya existe.

- Si deseamos obtener un doctor en especifico se envia el id

[Doctor](http://localhost:3000/api/doctores/2)

- para obtener los doctores filtrando por especialidad

[Doctor filtrado por especialidad](http://localhost:3000/api/doctores/especialidad/1)


___________________________________________________________________________

	Personas

Con el siguiente endpoint podemos obtener (get) y agregar personas(post)

[Personas](http://localhost:3000/personas)

para crear una personas, usamos el siguiente cuerpo json:

{
	"nombre": "Juan ",
	"cedula": "10735896245",
	"apellido": "Rulfo",
	"edad": 24,
	"telefono": "31456987459"
}

Aquí se valida para que no se repitan las cedulas

___________________________________________________________________________

	Citas medicas

con el siguiente endpoint se listas las citas medicas y se agregan

[Citas Medicas](http://localhost:3000/api/citas)

para agregar una cita medica el cuerpo del json es:

{
	"cedulaPaciente": "10735896245",
	"idEspecialidad": 1,
	"idDoctor": 1
}

La cedula del paciente ya debe estar registrado para poder crear la cita,
en base a la especialidad que se seleccione listara los doctores que tengan esa misma especialidad.


modelo de datos de la aplicacion

	Especialidad {
		id: number,
		nombreEspecialidad: string
	}

	Personas{
  		id: number;
   		nombre: string;
   		cedula: string;
   		apellido: string;
   		edad: number;
  		telefono: string;
	}

	Doctor{
  		id: number;
  		nombre: string;
  		apellido: string;
  		idespecialidad: number;
  		consultorio: string;
  		correo: string;
	}

	CitaMedicaAttributes {
  		cedulaPaciente: string;
  		idEspecialidad: number;
  		idDoctor: number;
	}


