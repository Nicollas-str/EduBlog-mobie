## Execução do EduBlog Mobile

O **EduBlog Mobile** foi desenvolvido com **React Native + TypeScript + Expo**. Durante o desenvolvimento, utilizamos o **Expo Go** em um dispositivo Android físico, evitando a necessidade de instalar um emulador.

### Pré-requisitos

- Node.js instalado;
- npm;
- aplicativo **Expo Go** no celular;
- computador e celular conectados à mesma rede quando utilizada a conexão LAN.

### Instalação

Clone o repositório e instale as dependências:

```bash
git clone <URL_DO_REPOSITORIO>
cd edublog-mobie
npm install
```

O projeto utiliza o Expo SDK 57 e a versão do Expo Go deve ser compatível com esse SDK.

---

## Iniciando o projeto

### LAN — modo padrão

Para iniciar o Expo normalmente:

```bash
npm start
```

ou:

```bash
npx expo start
```

O Expo exibirá um QR Code no terminal.

Abra o **Expo Go** no celular e escaneie o QR Code.

A comunicação ocorre diretamente pela rede local:

```text
Celular
   ↓
Wi-Fi
   ↓
Computador
   ↓
Expo / Metro
```

Quando a conexão LAN funciona, essa é a opção preferencial por não depender de um serviço externo de Tunnel.

---

## Tunnel — alternativa para problemas de rede

Caso o Expo Go fique carregando ou o celular não consiga acessar o computador pela rede local, o projeto possui uma opção de **Tunnel**.

O suporte utilizado pelo projeto é:

```bash
npm install -D @expo/ngrok@4.1.3
```

A dependência fica instalada no próprio projeto, sendo registrada no `package.json` e no `package-lock.json`.

Para iniciar usando Tunnel:

```bash
npm run start:tunnel
```

Script correspondente no `package.json`:

```json
{
  "scripts": {
    "start": "expo start",
    "start:tunnel": "expo start --tunnel"
  }
}
```

Nesse modo, a comunicação ocorre por meio do serviço de Tunnel:

```text
Celular
   ↓
Internet
   ↓
Tunnel / Ngrok
   ↓
Computador
   ↓
Expo / Metro
```

O Tunnel é utilizado **somente durante o desenvolvimento** e não faz parte do aplicativo final.

### LAN ou Tunnel?

| Comando                | Uso                                           |
| ---------------------- | --------------------------------------------- |
| `npm start`            | Execução normal pela rede local               |
| `npm run start:tunnel` | Alternativa quando a conexão LAN não funciona |

A conexão LAN normalmente apresenta melhor desempenho. O Tunnel é uma alternativa útil para redes com restrições de firewall, roteador ou isolamento entre dispositivos.

---

## Problemas de conexão com o celular

Se o Expo Go ficar indefinidamente em **"carregando"**, verifique primeiro:

1. O celular e o computador estão na mesma rede Wi-Fi.
2. O Expo está em execução no computador.
3. O Expo Go é compatível com o SDK utilizado pelo projeto.
4. O Firewall do Windows não está bloqueando a comunicação local.

Também é possível testar diretamente no navegador do celular:

```text
http://IP_DO_COMPUTADOR:8081
```

Para descobrir o endereço IPv4 do computador no Windows:

```cmd
ipconfig
```

Procure o **Endereço IPv4** do adaptador Wi-Fi.

Caso a conexão LAN continue bloqueada, utilize:

```bash
npm run start:tunnel
```

### Rede Public e Private no Windows

O Windows utiliza os perfis `Public` e `Private` para aplicar diferentes regras de rede e firewall.

Em uma rede doméstica confiável, o perfil `Private` pode facilitar a comunicação entre dispositivos da rede local. Em redes públicas ou desconhecidas, mantenha o perfil `Public`.

A alteração é feita somente no computador e não modifica a configuração do roteador ou do Wi-Fi para os demais dispositivos.

Para verificar o perfil atual:

```powershell
Get-NetConnectionProfile
```

Para alterar uma rede Wi-Fi confiável para `Private`:

```powershell
Set-NetConnectionProfile -InterfaceAlias "Wi-Fi" -NetworkCategory Private
```

Para retornar ao perfil `Public`:

```powershell
Set-NetConnectionProfile -InterfaceAlias "Wi-Fi" -NetworkCategory Public
```

> **Importante:** não altere uma rede desconhecida ou pública para `Private` apenas para fazer o Expo funcionar.

---

## Scripts disponíveis

| Comando                | Descrição                         |
| ---------------------- | --------------------------------- |
| `npm start`            | Inicia o Expo pela rede local     |
| `npm run start:tunnel` | Inicia o Expo utilizando Tunnel   |
| `npm run android`      | Inicia o Expo com destino Android |
| `npm run ios`          | Inicia o Expo com destino iOS     |
| `npm run web`          | Executa a aplicação no navegador  |
| `npm run lint`         | Executa o lint do projeto         |

Para interromper o servidor de desenvolvimento:

```text
Ctrl + C
```

---

## Fluxo de desenvolvimento

```text
┌──────────────────────┐
│    EduBlog Mobile    │
│ React Native         │
│ TypeScript           │
│ Expo                 │
└──────────┬───────────┘
           │
           ▼
      Expo Go
           │
           ▼
    Celular Android
           │
       ┌───┴───┐
       │       │
      LAN    Tunnel
       │       │
       ▼       ▼
   Computador / Expo
           │
           ▼
        API REST
```

O aplicativo mobile funciona como cliente da API REST do EduBlog, reutilizando os endpoints já desenvolvidos pelo projeto.
