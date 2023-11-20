import db from "../database";
import { generateRandomCode, logger } from "../tools";
import { Request, Response } from "express";
// CREATE TABLE IF NOT EXISTS Cliente (
// 	id INT NOT NULL AUTO_INCREMENT,
// 	nombre VARCHAR(255) NOT NULL UNIQUE,
// 	nit VARCHAR(255) NOT NULL UNIQUE,
// 	codigo VARCHAR(255) NOT NULL UNIQUE,
// 	nombre_path VARCHAR(255) NOT NULL UNIQUE,
// 	url_imagen VARCHAR(255) NOT NULL,
// 	max_usuarios INT NOT NULL,
// 	descripcion VARCHAR(255) NOT NULL,
// 	PRIMARY KEY (id)
// );
// CREATE TABLE Cliente_Usuario (
// 	id INT NOT NULL AUTO_INCREMENT,
// 	id_cliente INT NOT NULL,
// 	id_usuario INT NOT NULL,
// 	PRIMARY KEY (id)
// );

// CREATE TABLE Cliente_Curso (
// 	id INT NOT NULL AUTO_INCREMENT,
// 	id_cliente INT NOT NULL,
// 	id_curso INT NOT NULL,
// 	precio INT NOT NULL,
// 	certificado JSON NOT NULL, -- nobre de certificado, url de certificado
// 	PRIMARY KEY (id)
// );

export const createCliente = async (req: Request, res: Response) => {
  try {
    let {
      nombre,
      nit,
      nombre_path,
      max_usuarios,
      url_imagen,
      codigo,
      descripcion,
      url_banner,
    } = req.body;

    if (
      !nombre ||
      !nit ||
      !nombre_path ||
      !max_usuarios ||
      !codigo ||
      !descripcion ||
      !url_banner
    ) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }
    if (!codigo) {
      codigo = generateRandomCode();
    } else {
      codigo = codigo.toUpperCase();
    }

    const [clientedb]: any = await db.query(
      "SELECT * FROM cliente WHERE nit = ?",
      [nit]
    );

    if (clientedb.length > 0) {
      return res.status(400).json({ message: "El cliente ya existe" });
    } else {
      const [result]: any = await db.query(
        "INSERT INTO cliente (nombre, nit, codigo, url_imagen, nombre_path, max_usuarios, descripcion,url_banner) VALUES (?, ?, ?, ?, ?, ?, ?,?)",
        [
          nombre,
          nit,
          codigo,
          url_imagen,
          nombre_path,
          max_usuarios,
          descripcion,
          url_banner,
        ]
      );
      res.json({ message: "Cliente creado", id: result.insertId });
    }
  } catch (error: any) {
    console.log(error);
    logger(error);
    return res.status(500).json({ message: error.message });
  }
};

export const readClienteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [cliente]: any = await db.query(
      "SELECT * FROM cliente WHERE id = ?",
      [id]
    );
    if (cliente.length > 0) {
      const [usuarios] = await db.query(
        "SELECT usuario.* FROM cliente_usuario " +
          "INNER JOIN usuario ON cliente_usuario.id_usuario = usuario.id " +
          "WHERE cliente_usuario.id_cliente = ?",
        [id]
      );

      const [cursoCliente]: any = await db.query(
        "SELECT * FROM cliente_curso WHERE id_cliente = ?",
        [id]
      );

      const cursos: any[] = [];

      for (const curso of cursoCliente) {
        const [cursoDB]: any = await db.query(
          "SELECT * FROM curso WHERE id = ?",
          [curso.id_curso]
        );
        cursos.push(cursoDB[0]);
      }

      res.json({ ...cliente[0], usuarios, cursos: cursoCliente });
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error: any) {
    console.log(error);
    logger(error);
    return res.status(500).json({ message: error.message });
  }
};

export const readClienteByPath = async (req: Request, res: Response) => {
  try {
    const { nombre_path } = req.params;
    const [cliente]: any = await db.query(
      "SELECT * FROM cliente WHERE nombre_path = ?",
      [nombre_path]
    );
    if (cliente.length > 0) {
      const [usuarios]: any = await db.query(
        "SELECT * FROM cliente_usuario WHERE id_cliente = ?",
        [cliente[0].id]
      );
      const [cursoCliente]: any = await db.query(
        "SELECT * FROM cliente_curso WHERE id_cliente = ?",
        [cliente[0].id]
      );

      const cursos: any[] = [];

      for (const curso of cursoCliente) {
        const [cursoDB]: any = await db.query(
          "SELECT * FROM curso WHERE id = ?",
          [curso.id_curso]
        );
        cursos.push(cursoDB[0]);
      }

      res.json({ ...cliente[0], usuarios, cursos });
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error: any) {
    console.log(error);
    logger(error);
    return res.status(500).json({ message: error.message });
  }
};

export const readClienteByCodigo = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const [cliente]: any = await db.query(
      "SELECT * FROM cliente WHERE codigo = ?",
      [codigo]
    );
    if (cliente.length > 0) {
      const [usuarios]: any = await db.query(
        "SELECT * FROM cliente_usuario WHERE id_cliente = ?",
        [cliente[0].id]
      );
      const [cursoCliente]: any = await db.query(
        "SELECT * FROM cliente_curso WHERE id_cliente = ?",
        [cliente[0].id]
      );

      const cursos: any[] = [];

      for (const curso of cursoCliente) {
        const [cursoDB]: any = await db.query(
          "SELECT * FROM curso WHERE id = ?",
          [curso.id_curso]
        );
        cursos.push(cursoDB[0]);
      }

      res.json({ ...cliente[0], usuarios, cursos });
    } else {
      res.status(404).json({ message: "Código de acceso incorrecto" });
    }
  } catch (error: any) {
    console.log(error);
    logger(error);
    return res.status(500).json({ message: error.message });
  }
};

export const readClientes = async (req: Request, res: Response) => {
  try {
    const [clientes]: any = await db.query("SELECT * FROM cliente");
    res.json(clientes);
  } catch (error: any) {
    console.log(error);
    logger(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let {
      nombre,
      nit,
      nombre_path,
      max_usuarios,
      url_imagen,
      codigo,
      descripcion,
      url_banner,
    } = req.body;

    if (
      !nombre ||
      !nit ||
      !nombre_path ||
      !max_usuarios ||
      !codigo ||
      !descripcion ||
      !url_banner
    ) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }
    codigo = codigo.toUpperCase();

    const [clientedb]: any = await db.query(
      "SELECT * FROM cliente WHERE id = ?",
      [id]
    );
    if (url_imagen === undefined) {
      url_imagen = clientedb[0].url_imagen;
    }

    if (clientedb.length > 0) {
      await db.query(
        "UPDATE cliente SET nombre = ?, nit = ?, nombre_path = ?, max_usuarios = ?, url_imagen = ?, codigo = ?, descripcion = ?, url_banner = ? WHERE id = ?",
        [
          nombre,
          nit,
          nombre_path,
          max_usuarios,
          url_imagen,
          codigo,
          descripcion,
          url_banner,
          id,
        ]
      );
      res.json({ message: "Cliente actualizado" });
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error: any) {
    console.log(error);
    logger(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [clientedb]: any = await db.query(
      "SELECT * FROM cliente WHERE id = ?",
      [id]
    );

    if (clientedb.length > 0) {
      await db.query("DELETE FROM cliente WHERE id = ?", [id]);
      res.json({ message: "Cliente eliminado" });
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error: any) {
    console.log(error);
    logger(error);
    return res.status(500).json({ message: error.message });
  }
};

export const createClienteCurso = async (req: Request, res: Response) => {
  // Inscribir cliente a curso
  try {
    let { id_cliente, id_curso, precio, certificado } = req.body;

    if (!id_cliente || !id_curso) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    if (!precio) {
      precio = 0;
    }

    if (!certificado) {
      certificado = {
        nombre: "",
        url: "",
      };
    }

    const [cliente]: any = await db.query(
      "SELECT * FROM cliente WHERE id = ?",
      [id_cliente]
    );
    if (cliente.length === 0) {
      return res.status(400).json({ message: "El cliente no existe" });
    }

    const [curso]: any = await db.query("SELECT * FROM curso WHERE id = ?", [
      id_curso,
    ]);
    if (curso.length === 0) {
      return res.status(400).json({ message: "El curso no existe" });
    }

    const [cliente_curso]: any = await db.query(
      "SELECT * FROM cliente_curso WHERE id_cliente = ? AND id_curso = ?",
      [id_cliente, id_curso]
    );
    if (cliente_curso.length > 0) {
      return res
        .status(400)
        .json({ message: "El cliente ya está inscrito en el curso" });
    }

    const [query]: any = await db.query(
      "INSERT INTO cliente_curso (id_cliente, id_curso, precio, certificado) VALUES (?, ?, ?, ?)",
      [id_cliente, id_curso, precio, JSON.stringify(certificado)]
    );
    res.json({ message: "Cliente inscrito al curso", id: query.insertId });
  } catch (error) {
    logger(error);
    res.status(500).json({ message: "Error al inscribir el cliente al curso" });
  }
};

export const readClienteCurso = async (req: Request, res: Response) => {
  try {
    const { codigo, id } = req.params;

    const [cliente]: any = await db.query(
      "SELECT * FROM cliente WHERE codigo = ?",
      [codigo]
    );

    if (cliente.length === 0) {
      return res.status(400).json({ message: "El cliente no existe" });
    }

    console.log(cliente[0].id, id);

    const [cliente_curso]: any = await db.query(
      "SELECT * FROM cliente_curso WHERE id_cliente = ? AND id_curso = ?",
      [cliente[0].id, id]
    );
    if (cliente_curso.length === 0) {
      return res
        .status(400)
        .json({ message: "El cliente no está inscrito en el curso" });
    }
    const [curso]: any = await db.query("SELECT * FROM curso WHERE id = ?", [
      cliente_curso[0].id_curso,
    ]);
    res.json({
      curso: curso[0],
      cliente: cliente[0],
      cliente_curso: cliente_curso[0],
    });
  } catch (error) {
    logger(error);
    res
      .status(500)
      .json({ message: "Error al obtener el cliente inscrito al curso" });
  }
};

export const updateClienteCurso = async (req: Request, res: Response) => {
  try {
    const { id_cliente, id_curso } = req.params;
    const { precio, certificado } = req.body;

    if (precio === undefined || !certificado) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const [cliente_curso]: any = await db.query(
      "SELECT * FROM cliente_curso WHERE id_cliente = ? AND id_curso = ?",
      [id_cliente, id_curso]
    );
    if (cliente_curso.length === 0) {
      return res
        .status(400)
        .json({ message: "El cliente no está inscrito en el curso" });
    }

    await db.query(
      "UPDATE cliente_curso SET precio = ?, certificado = ? WHERE id_cliente = ? AND id_curso = ?",
      [precio, JSON.stringify(certificado), id_cliente, id_curso]
    );
    res.json({ message: "Cliente actualizado en el curso" });
  } catch (error) {
    logger(error);
    res
      .status(500)
      .json({ message: "Error al actualizar el cliente inscrito al curso" });
  }
};

export const deleteClienteCurso = async (req: Request, res: Response) => {
  try {
    const { id_curso, id_cliente } = req.params;
    const [cliente_curso]: any = await db.query(
      "SELECT * FROM cliente_curso WHERE id_cliente = ? AND id_curso = ?",
      [id_cliente, id_curso]
    );
    if (cliente_curso.length === 0) {
      return res
        .status(400)
        .json({ message: "El cliente no está inscrito en el curso" });
    }
    await db.query(
      "DELETE FROM cliente_curso WHERE id_cliente = ? AND id_curso = ?",
      [id_cliente, id_curso]
    );
    res.json({ message: "Cliente eliminado del curso" });
  } catch (error) {
    logger(error);
    res
      .status(500)
      .json({ message: "Error al eliminar el cliente inscrito al curso" });
  }
};

export const createClienteUsuario = async (req: Request, res: Response) => {
  try {
    const { id_cliente, id_usuario } = req.body;

    if (!id_cliente || !id_usuario) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const [cliente]: any = await db.query(
      "SELECT * FROM cliente WHERE id = ?",
      [id_cliente]
    );

    const [usuario]: any = await db.query(
      "SELECT * FROM usuario WHERE id = ?",
      [id_usuario]
    );

    if (cliente.length > 0 && usuario.length > 0) {
      const [result]: any = await db.query(
        "INSERT INTO cliente_usuario (id_cliente, id_usuario,nombre_path) VALUES (?, ?,?)",
        [id_cliente, id_usuario, cliente[0].nombre_path]
      );
      res.json({ message: "Cliente_Usuario creado", id: result[0] });
    } else {
      res.status(404).json({ message: "Cliente o usuario no encontrado" });
    }
  } catch (error: any) {
    console.log(error);
    logger(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteClienteUsuario = async (req: Request, res: Response) => {
  try {
    const { id_cliente, id_usuario } = req.body;
    const [cliente_usuario]: any = await db.query(
      "SELECT * FROM cliente_usuario WHERE id_cliente = ? AND id_usuario = ?",
      [id_cliente, id_usuario]
    );
    if (cliente_usuario.length > 0) {
      await db.query(
        "DELETE FROM cliente_usuario WHERE id_cliente = ? AND id_usuario = ?",
        [id_cliente, id_usuario]
      );
      res.json({ message: "Cliente_Usuario eliminado" });
    } else {
      res.status(404).json({ message: "Cliente_Usuario no encontrado" });
    }
  } catch (error: any) {
    console.log(error);
    logger(error);
    return res.status(500).json({ message: error.message });
  }
};
