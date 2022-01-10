function criaPaciente(nome, peso, altura, gordura){
    var paciente = {
        nome: nome,
        altura: altura,
        peso: peso,
        gordura: gordura,
        imc: 0
    }

    return paciente
}

function validaPaciente(paciente){
    msgsErros = []
    var valido = true

    if(paciente.nome == ""){
        msgsErros.push("Nome inválido!")
        valido = false
    }

    if(paciente.peso == "" || paciente.peso > 500 || paciente.peso <= 0){
        msgsErros.push("Peso inválido!")
        valido = false
    }

    if(paciente.altura == "" || paciente.altura > 3 || paciente.altura <= 0){
        msgsErros.push("Altura inválida!")
        valido = false
    }

    if(paciente.gordura == "" || paciente.gordura < 0){
        msgsErros.push("% de gordura inválida")
        valido = false
    }
    
    return valido
}

function calculaIMC(paciente){
    var imc = parseInt(paciente.peso) / (parseFloat(paciente.altura) * parseFloat(paciente.altura))
    paciente.imc = imc.toFixed(2)
}

var botao = document.querySelector(".btn-adicionar")
var form = document.querySelector(".formulario")
var erro = document.querySelector(".erro")
var msgsErros = []

botao.addEventListener("click", function(e){
    e.preventDefault()

    erro.classList.remove("invisivel")
    erro.innerHTML = ""

    var paciente = criaPaciente(form.nome.value, form.peso.value, form.altura.value, form.gordura.value)
    var valido = validaPaciente(paciente)

    if(valido){
        calculaIMC(paciente)
        adicionaPaciente(paciente)
    }else {
        for(e of msgsErros){
            erro.innerHTML += e + "<br>"
        }   
        setTimeout(function(){
            erro.classList.add("invisivel")
        }, 2000)
    } 
})
