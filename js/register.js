document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm')

  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault()

      const email = document.getElementById('email').value.trim().toLowerCase()
      const cpf = document.getElementById('cpf').value.replace(/\D/g, '')
      const password = document.getElementById('password').value.trim()

      if (!email || !cpf || !password) {
        showError('Preencha todos os campos.')
        return
      }

      if (!validateEmail(email)) {
        showError('Formato de e-mail inválido.')
        return
      }

      if (cpf.length !== 11) {
        showError('CPF deve conter 11 dígitos.')
        return
      }

      const users = JSON.parse(localStorage.getItem('users')) || []
      const exists = users.some(
        user => user.email === email || user.cpf === cpf
      )

      if (exists) {
        showError('E-mail ou CPF já cadastrados.')
        return
      }

      const newUser = { email, cpf, password, saldo: 0 }
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))

      showSuccess('Cadastro realizado com sucesso! Redirecionando...')
      setTimeout(() => {
        window.location.href = 'index.html'
      }, 2000)
    })
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  function showError(message) {
    createMessageBox(message, 'error-box')
  }

  function showSuccess(message) {
    const existing = document.querySelector('.success-box')
    if (existing) existing.remove()

    const box = document.createElement('div')
    box.className = 'success-box'
    box.innerHTML = `
    <span>${message}</span>
    <div class="loader"></div>
    <button class="close-msg">&times;</button>
  `
    document.body.appendChild(box)

    document.querySelector('.success-box .close-msg').onclick = () => {
      box.remove()
    }

    setTimeout(() => {
      box.remove()
    }, 5000)
  }
})
