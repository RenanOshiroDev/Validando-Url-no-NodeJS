import chalk from "chalk";

function extraiLinks(arrLinks){
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
     // recebe uma lista de obj, pega somente os valores
     // e transfomra em outra lista apenas com os valores no caso (os links)
    // .join converte todos objs da lista , para um obj de string!
}

async function checaStatus(listaUrls){
    // Promise .all ele recebe uma lista de promessa pendentes, resolver e retornar uma lista resolvida!
    const arrStatus = await Promise .all(
        listaUrls.map(async (url) => {
            try{
                const response = await fetch(url)
                return response.status;
            }catch(erro){
                return manejaErros(erro);
            }
        })
    )
    return arrStatus;
}

function manejaErros(erro){
    if(erro.cause.code === 'ENOTFOUND'){
        return "Link não encontrado.";
    }
    return "Ocorreu algum erro.";
}

export default async function listaValidada(listaDeLinks){
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);
    return listaDeLinks.map((obj, indice) =>({
        ...obj,
        status : status[indice]
    }));
}

