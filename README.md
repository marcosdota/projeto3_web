# Projeto 3 - Unity

## Rotas - Views

| Recurso             |  Descrição                  				 |
| ----------------    | -------------------------------------------------------- |
|  GET /              |  Redireciona para a página principal [/views/index.html] |
|  GET /visualizacoes |  Retorna número de visualizações     			 |
|  GET /num_post      |  Retorna número de posts realizados pelo admin na sessão |

## Rotas - Sessions [consistências]

| Recurso              |  Descrição                  				 	  |
| ----------------     | ---------------------------------------------------------------- |
|  GET /usuario_logado |  Verifica se uma sessão é válida e retorna flag de administrador |
|  GET /usuario_logout |  Verifica se uma sessão é válida e destroi - Logout		  |

## Rotas - Controllers

| Recurso              	   |  Descrição              |
| ----------------     	   | ----------------------- |
|  POST /usuario/login     |  Realiza Login	     |
|  POST /usuario/cadastrar |  Cadastra usuario	     |
|  GET /posts 		   |  Retornar postagens     |
|  POST /posts/novopost    |  Cadastra nova postagem |

## Administrador

email: admin@admin.com <br/>
senha: 123456789

## Autores
[Daniel Amaral Augusto](https://github.com/dnlaug) <br/>
[Marcos Dóta de Lima](https://github.com/marcosdota)
