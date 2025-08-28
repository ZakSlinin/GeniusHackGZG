FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o bin/api ./cmd

FROM gcr.io/distroless/base-debian12
WORKDIR /app
ENV PORT=8080
COPY --from=builder /app/bin/api /app/api
EXPOSE 8080
USER 65532:65532
ENTRYPOINT ["/app/api"]

