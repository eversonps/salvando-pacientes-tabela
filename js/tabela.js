function adicionaPaciente(paciente){   
    var pacienteLinha = document.createElement("tr")
    pacienteLinha.addEventListener("dblclick", deletaPaciente)
    corpoTabela.appendChild(pacienteLinha)

    var nomePaciente = document.createElement("td")
    var pesoPaciente = document.createElement("td")
    var alturaPaciente = document.createElement("td")
    var gorduraPaciente = document.createElement("td")
    var imcPaciente = document.createElement("td")

    nomePaciente.textContent = paciente.nome
    pesoPaciente.textContent = paciente.peso
    alturaPaciente.textContent = paciente.altura
    gorduraPaciente.textContent = paciente.gordura
    imcPaciente.textContent = paciente.imc

    pacienteLinha.appendChild(nomePaciente)
    pacienteLinha.appendChild(pesoPaciente)
    pacienteLinha.appendChild(alturaPaciente)
    pacienteLinha.appendChild(gorduraPaciente)
    pacienteLinha.appendChild(imcPaciente)
}

function verificaPaciente(){
    var pacientes = document.querySelectorAll(".paciente")
    
    for(pacienteLinha of pacientes){
        nomePaciente = pacienteLinha.querySelector(".nome")
        pesoPaciente = pacienteLinha.querySelector(".peso")
        alturaPaciente = pacienteLinha.querySelector(".altura")
        gorduraPaciente = pacienteLinha.querySelector(".gordura")
        imcPaciente = pacienteLinha.querySelector(".imc")

        var paciente = criaPaciente(nomePaciente.textContent, pesoPaciente.textContent, alturaPaciente.textContent, gorduraPaciente.textContent)
        var valido = validaPaciente(paciente)

        if(valido){
            calculaIMC(paciente)
            imcPaciente.textContent = paciente.imc
            pacienteLinha.classList.remove("invalido")
        }else {
            imcPaciente.textContent = "Inválido"
            pacienteLinha.classList.add("invalido")
        }
    }
}

function deletaPaciente(){
    this.classList.add("none")
    var paciente = this
    setTimeout(function(){
        paciente.remove()
    }, 1000)
}

function filtraPaciente(){
    var textoDigitado = this.value
    console.log(textoDigitado)
    for (paciente of pacientes) {
        nomePaciente = paciente.querySelector(".nome")
        var expressao = new RegExp(textoDigitado, "i")

        if(!expressao.test(nomePaciente.textContent)){
            paciente.classList.add("invisivel")
        }else{
            paciente.classList.remove("invisivel")
        }
    }
}

function trazPacientes(){
    var xhr = new XMLHttpRequest
    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes")
    xhr.responseType = "json"
    
    xhr.onload = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var pacientesBdd = xhr.response
            for (pacienteBdd of pacientesBdd) {
                var paciente = criaPaciente(pacienteBdd.nome, pacienteBdd.peso, pacienteBdd.altura, pacienteBdd.gordura)
                calculaIMC(paciente)
                adicionaPaciente(paciente)
            }
        }
    }

    xhr.send()

    
    
}

var corpoTabela = document.querySelector(".corpo-tabela")
var btnTrazPacientes = document.querySelector(".btn-pacientes")
btnTrazPacientes.addEventListener("click", trazPacientes)

var pacientes = document.querySelectorAll(".paciente")
for (paciente of pacientes) {
    paciente.addEventListener("dblclick", deletaPaciente)
}

var textoDigitado = document.querySelector("#texto-digitado")
textoDigitado.addEventListener("input", filtraPaciente)

verificaPaciente()