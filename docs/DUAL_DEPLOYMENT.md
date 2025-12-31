# Dual Deployment Strategy: Render + k3s

## Overview

This portfolio application uses a **dual deployment strategy**:
- **Primary (Current):** Render (frontend static site + analytics backend web service)
- **Secondary (Future):** Local k3s/k3d cluster for development and eventual production migration

This allows you to:
1. Keep Render as a reliable fallback while developing on k3s locally
2. Test Kubernetes deployment patterns without risking production
3. Migrate to k3s with a dedicated server when ready
4. Maintain a consistent, version-controlled infrastructure-as-code approach

---

## Architecture

### Current: Render Deployment

```
┌─────────────────────────────────────────────┐
│         GitHub Actions (CI/CD)              │
│                                             │
│  1. Build & Test (all branches)             │
│  2. Build Docker images (push to Hub)       │
│  3. Deploy to Render (main/enhancement)     │
│  4. Trigger deploy hooks                    │
└─────────────────────────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────┐
        │    Render (Primary)      │
        │                          │
        │  Frontend: Static Nginx  │
        │  Backend: Node.js +      │
        │  CronJob for reports     │
        └──────────────────────────┘
```

### Future: k3s as Primary

```
┌─────────────────────────────────────────────┐
│         GitHub Actions (CI/CD)              │
│                                             │
│  1. Build & Test (all branches)             │
│  2. Build Docker images (push to Hub)       │
│  3. Deploy to Render (main/enhancement)     │
│  4. Deploy to k3s (manual trigger)          │
└─────────────────────────────────────────────┘
                       │
         ┌─────────────┴──────────────┐
         ▼                            ▼
┌──────────────────┐    ┌──────────────────────┐
│  Render (Backup) │    │   k3s (Primary)      │
│                  │    │                      │
│  Frontend        │    │  Frontend (Nginx)    │
│  Backend + Cron  │    │  Backend (Node.js)   │
│  Minimal uptime  │    │  CronJob             │
│                  │    │  Persistent Storage  │
└──────────────────┘    └──────────────────────┘
```

---

## GitHub Actions Workflows

### 1. **deploy.yml** (Primary - Render + Docker Images)

**When it runs:**
- Push to `main` or `portfolio-enhancement`
- Pull request to `main`

**What it does:**
1. Install dependencies (frontend + server)
2. Run linting (non-blocking)
3. Run tests (frontend + backend)
4. Build Vite project
5. Build Docker images (frontend & backend)
6. Push to Docker Hub (`mavalfelly25/portfolio-{frontend,backend}:latest` and tagged with commit SHA)
7. Deploy to Render (only on push, not PR)

**Secrets required:**
- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub access token
- `RENDER_DEPLOY_HOOK_ANALYTICS`: Render webhook for analytics backend
- `RENDER_DEPLOY_HOOK_FRONTEND`: Render webhook for frontend

### 2. **deploy-k3s.yml** (Manual - k3s Deployment)

**When it runs:**
- Manual trigger (workflow_dispatch) from GitHub Actions UI
- Inputs: image tag (default: `latest`), cluster name (default: `profile`)

**What it does:**
1. Generates deployment instructions markdown
2. Uploads deployment guide as artifact
3. Shows image references in summary

**To trigger:**
1. Go to **Actions** tab in GitHub
2. Click **"Deploy to Local k3s Cluster"**
3. Click **"Run workflow"**
4. (Optional) Enter image tag and cluster name
5. Follow the instructions in the artifact

---

## Local k3s Setup

### Prerequisites

```bash
# Install k3d (for containerized k3s)
curl -s https://raw.githubusercontent.com/k3d-io/k3d/main/install.sh | bash

# OR install k3s directly (for native k3s)
curl -sfL https://get.k3s.io | sh -

# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl && sudo mv kubectl /usr/local/bin/
```

### Step 1: Deploy Locally Using Script

```bash
# Navigate to the k8s directory
cd k8s

# Run the deployment script
./deploy-local-k3s.sh [image-tag] [cluster-name] [dashboard]

# Examples:
./deploy-local-k3s.sh latest profile           # Uses default Docker Hub user
./deploy-local-k3s.sh v1.2.3 profile           # Specific version tag
./deploy-local-k3s.sh v1.2.3 profile dashboard # Install with Kubernetes Dashboard
```

**What the script does:**
1. Creates k3d cluster (if using k3d)
2. Verifies cluster connectivity
3. Tears down existing portfolio namespace (clean redeploy)
4. Optionally installs Kubernetes Dashboard (if third arg is 'dashboard')
5. Creates `portfolio` namespace
6. Updates image references in manifests
7. Applies all k8s manifests in order
8. Waits for deployments to be ready
9. Displays status and access instructions

### Step 2: Manual Deployment (If Not Using Script)

```bash
# Create namespace
kubectl create namespace portfolio

# Update image references in manifests
# Edit: k8s/03-backend-deployment.yaml
# Edit: k8s/05-frontend-deployment.yaml
# Edit: k8s/08-cronjob.yaml
# Change: image: mavalfelly25/portfolio-backend:latest → your desired tag

# Update secrets with your email credentials
# Edit: k8s/02-secrets.yaml
# Base64 encode your credentials:
echo -n "your-email@gmail.com" | base64      # EMAIL_USER
echo -n "your-app-password" | base64         # EMAIL_PASS
echo -n "notification@example.com" | base64  # NOTIFICATION_EMAIL

# Apply all manifests
kubectl apply -f k8s/

# Verify deployment
kubectl get pods -n portfolio
kubectl describe pod <pod-name> -n portfolio
```

### Step 3: Access Your Application

```bash
# Port-forward for local access (k3d)
kubectl port-forward svc/portfolio-frontend 8080:80 -n portfolio &
kubectl port-forward svc/portfolio-backend 3001:3001 -n portfolio &

# Visit: http://localhost:8080
```

Or if using k3s on a server with DNS:
- Frontend: `https://matt-feliciano.com`
- API: `https://matt-feliciano.com/api` (via Ingress)

### Step 4: Monitor & Debug

```bash
# View logs
kubectl logs -f deployment/portfolio-frontend -n portfolio
kubectl logs -f deployment/portfolio-backend -n portfolio

# Describe pods for errors
kubectl describe pod <pod-name> -n portfolio

# Check PVC status
kubectl get pvc -n portfolio

# View events
kubectl get events -n portfolio --sort-by='.lastTimestamp'
```

---

## Transitioning to k3s as Primary

When you get a dedicated server, here's the migration plan:

### Phase 1: Setup k3s on Dedicated Server
```bash
# SSH into your dedicated server
ssh user@your-server.com

# Install k3s
curl -sfL https://get.k3s.io | sh -

# Export kubeconfig
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml

# Verify
kubectl get nodes
```

### Phase 2: Update Workflows
Update `.github/workflows/deploy.yml`:
1. Change Render deploy to conditional/optional (move to separate manual job)
2. Update k3s deploy job to auto-trigger on main/enhancement push
3. Or create a new `deploy-k3s-prod.yml` workflow for production deployments

### Phase 3: DNS & Ingress
1. Point your domain (`matt-feliciano.com`) to your server's IP
2. Ensure k3s Ingress controller is exposed (default: Traefik on port 80/443)
3. Update Ingress manifest with actual domain
4. Enable HTTPS with cert-manager + Let's Encrypt (optional but recommended)

### Phase 4: Keep Render as Backup
- Keep Render deployment optional
- Update deploy.yml to have separate manual trigger for Render deploy
- Maintains a fallback if k3s cluster has issues

---

## Managing Images on Docker Hub

Your images will be pushed with:
- **Tags:** `latest`, `{commit-sha}`
- **Naming:** `mavalfelly25/portfolio-frontend:latest` and `mavalfelly25/portfolio-backend:latest`

To use specific versions:
```bash
./deploy-local-k3s.sh v1.2.3  # Uses commit SHA or version tag
```

To manually push from local:
These commands assume your user can run `docker` without `sudo` (for example, by being in the `docker` group).
```bash
docker build -t mavalfelly25/portfolio-frontend:v1.2.3 .
docker push mavalfelly25/portfolio-frontend:v1.2.3

docker build -t mavalfelly25/portfolio-backend:v1.2.3 -f server/Dockerfile .
docker push mavalfelly25/portfolio-backend:v1.2.3
```

---

## Quick Cheat Sheet

| Task | Command |
|------|---------|
| Deploy locally | `cd k8s && ./deploy-local-k3s.sh` |
| View pods | `kubectl get pods -n portfolio` |
| View logs | `kubectl logs -f deployment/portfolio-frontend -n portfolio` |
| Port-forward frontend | `kubectl port-forward svc/portfolio-frontend 8080:80 -n portfolio` |
| Port-forward backend | `kubectl port-forward svc/portfolio-backend 3001:3001 -n portfolio` |
| Update image | `sed -i 's|image: .*|image: mavalfelly25/portfolio-frontend:v1.2.3|' k8s/05-frontend-deployment.yaml` |
| Delete deployment | `kubectl delete namespace portfolio` |
| Restart backend | `kubectl rollout restart deployment/portfolio-backend -n portfolio` |
| Check ingress | `kubectl get ingress -n portfolio` |

---

## Troubleshooting

### Docker Images Not Pushing in CI
- **Check:** DOCKER_USERNAME and DOCKER_PASSWORD secrets are set in GitHub
- **Check:** Docker access token has push permissions
- **Check:** Workflow logs for docker/build-push-action errors

### k3s Pod Won't Start (CrashLoopBackOff)
```bash
kubectl logs <pod-name> -n portfolio
kubectl describe pod <pod-name> -n portfolio
```
Common issues:
- Missing environment variables → Check Secrets
- Image pull failures → Check image name, Docker credentials
- Port conflicts → Check port-forward, ingress config
- PVC not bound → Check PVC status, storage class

### Render Deploy Stops Working After Docker Push Added
- Ensure `RENDER_DEPLOY_HOOK_*` secrets still exist
- Check deploy-to-render job runs after build-and-test
- Render logs may show deployment details

---

## Files Added/Modified

| File | Change |
|------|--------|
| `.github/workflows/deploy.yml` | Added Docker image build/push steps |
| `.github/workflows/deploy-k3s.yml` | **NEW** - Manual k3s deployment workflow |
| `k8s/deploy-local-k3s.sh` | **NEW** - Local cluster deployment script |
| `k8s/DUAL_DEPLOYMENT.md` | **NEW** - This document |

---

## Next Steps

1. **Add Docker Hub Secrets to GitHub** (if not already done)
   - `DOCKER_USERNAME`: `mavalfelly25`
   - `DOCKER_PASSWORD`: Your Docker Hub PAT

2. **Test Local Deployment**
   ```bash
   cd k8s && ./deploy-local-k3s.sh
   ```

3. **Verify Images Push in GitHub Actions**
   - Push a commit to `main` or `portfolio-enhancement`
   - Check Actions tab for workflow success
   - Verify images on Docker Hub dashboard

   ## Local access from mobile

   You can access the local k3s deployment from another device (phone on the same LAN) using one of these approaches.

   - Quick — Port-forward to all interfaces (fast, temporary):

   ```bash
   # Port-forward the frontend service and bind to all interfaces
   kubectl port-forward --address 0.0.0.0 svc/portfolio-frontend-svc 8080:80 -n portfolio
   # On your phone visit: http://<HOST_IP>:8080
   # Find your host IP (example):
   ip -4 addr show | grep -oP '(?<=inet\s)\d+\.\d+\.\d+\.\d+' | grep -v '^127'
   ```

   Notes: `--address 0.0.0.0` makes the port accessible from other devices on your LAN. If your kubectl version doesn't support `--address`, use the Ingress or `ngrok` options below.

   - Preferred — Use Ingress (recommended for repeated testing):

   1. Make sure your ingress controller (Traefik on k3s) is running and listening on host ports 80/443.
   2. Remove the `host:` line from `k8s/07-ingress.yaml` (or leave it out) so the Ingress matches requests regardless of Host header, then apply the manifest:

   ```bash
   kubectl apply -f k8s/07-ingress.yaml
   # Access from your phone at http://<HOST_IP>
   ```

   Notes: Ingress is the cleanest approach — it exposes the app on port 80/443 of the host machine. Ensure your laptop's firewall allows incoming connections.

   - Public internet (tunnel) — `ngrok` (no router changes required):

   ```bash
   # Forward local port 8080 with ngrok (signup required for stable URLs)
   ngrok http 8080
   # Use the public ngrok URL on your phone
   ```

   Security & networking notes
   - If your host has a firewall (ufw, firewalld), open the port you use (80 or 8080). Example:

   ```bash
   sudo ufw allow 8080/tcp    # or sudo ufw allow 80/tcp
   ```

   - If you want a domain name on your phone, either:
      - Use a local DNS or host-entry mechanism on the phone (some routers allow custom DNS), or
      - Use `ngrok` or similar tunnel to get a public URL.

   - For remote access from outside your LAN, prefer a tunnel (ngrok) or expose ports at your router (port forwarding) — be aware of security implications.

   These options let you test the site from your phone quickly. If you want, I can add a script to the `k8s/` folder that starts a port-forward bound to 0.0.0.0 and prints the host IP automatically.

4. **Plan k3s Server Migration** (when ready)
   - Document server specs and setup
   - Test DNS changes
   - Plan DNS switchover

---

**Questions?** See k8s/README.md for base deployment docs, or check GitHub Actions logs for CI/CD issues.
