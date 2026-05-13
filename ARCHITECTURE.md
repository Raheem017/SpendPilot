# System Architecture

### System Diagram
```mermaid
graph TD
    A[User] -->|Inputs Spend Data| B(React Frontend)
    B -->|POST Request| C[Node.js Backend]
    C -->|Audit Math| D{Audit Engine}
    D -->|Lead Data| E[(MongoDB)]
    D -->|Summary Request| F[OpenRouter API]
    C -->|Trigger Email| G[Resend API]
    F -->|Personalized Text| B
    D -->|Results| B