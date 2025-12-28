# Portfolio k3s Deployment

This directory contains the files needed to deploy the portfolio application to a k3s (or any other Kubernetes) cluster.

## Prerequisites

1.  **k3s Cluster**: A running k3s cluster. You can install it on a Linux server with a single command:
    ```bash
    curl -sfL https://get.k3s.io | sh -
    ```
2.  **kubectl**: The Kubernetes command-line tool, configured to communicate with your cluster. When you install k3s, it creates a `k3s.yaml` file at `/etc/rancher/k3s/k3s.yaml`. You can use this file with `kubectl`:
    ```bash
    export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
    kubectl get nodes
    ```
3.  **Docker**: Docker installed on your local machine to build and push the container images.
4.  **Docker Hub Account** (or other container registry): You will need a place to push your container images so that your k3s cluster can pull them.

## Structure

*   `nginx.conf`: Nginx configuration for the frontend container.
*   `00-namespace.yaml`: Creates a dedicated `portfolio` namespace for the application.
*   `01-pvc.yaml`: Creates a `PersistentVolumeClaim` to provide stable storage for the analytics data.
*   `02-secrets.yaml`: A template for creating the `Secret` that holds your email credentials.
*   `03-backend-deployment.yaml`: Deploys the Node.js backend API server.
*   `04-backend-service.yaml`: Creates a `Service` to expose the backend internally within the cluster.
*   `05-frontend-deployment.yaml`: Deploys the Nginx frontend server.
*   `06-frontend-service.yaml`: Creates a `Service` to expose the frontend internally.
*   `07-ingress.yaml`: Exposes the frontend and the API to the internet via an Ingress controller (Traefik is built-in with k3s).
*   `08-cronjob.yaml`: The `CronJob` that runs the nightly analytics report.

## Deployment Steps

### 1. Build and Push the Docker Images

Before you can deploy to Kubernetes, you need to build the Docker images for the frontend and backend and push them to a container registry (e.g., Docker Hub).

**Important**: Remember to replace `your-dockerhub-username` with your actual Docker Hub username in the commands below.

```bash
# Navigate to the root of the project
cd /path/to/your/project

# Build and push the frontend image
docker build -t your-dockerhub-username/portfolio-frontend:latest .
docker push your-dockerhub-username/portfolio-frontend:latest

# Build and push the backend image
docker build -t your-dockerhub-username/portfolio-backend:latest -f server/Dockerfile .
docker push your-dockerhub-username/portfolio-backend:latest
```

### 2. Update the Kubernetes Manifests

You need to update `03-backend-deployment.yaml`, `05-frontend-deployment.yaml`, and `08-cronjob.yaml` to use the image you just pushed. Look for the `image:` field in these files and change it to `your-dockerhub-username/portfolio-backend:latest` or `your-dockerhub-username/portfolio-frontend:latest`.

You will also need to update `07-ingress.yaml` to use your domain name.

### 3. Create the Secret

First, you need to encode your email username and password in Base64.

```bash
echo -n 'your-email@gmail.com' | base64
echo -n 'your-gmail-app-password' | base64
```

Copy the resulting strings into `k8s/02-secrets.yaml`, replacing the placeholders. Then, apply the secret to your cluster:

```bash
kubectl apply -f k8s/02-secrets.yaml
```

### 4. Apply the Manifests

Apply all the manifest files to your cluster in order.

```bash
kubectl apply -f k8s/
```

### 5. Configure DNS

1.  Find the public IP address of your k3s server.
2.  In your DNS provider (e.g., Namecheap), create an `A` record for your domain (or a subdomain like `k3s.yourdomain.com`) and point it to the IP address of your k3s server.

After a few minutes, you should be able to access your application at the domain you configured.

## Managing the Deployment

*   **Check the status of your pods**: `kubectl get pods -n portfolio`
*   **View logs for a pod**: `kubectl logs -n portfolio <pod-name>`
*   **Delete the deployment**: `kubectl delete -f k8s/`
