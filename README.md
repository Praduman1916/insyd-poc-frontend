```markdown
# Insyd Notification POC (Frontend)

**Live Demo**: [https://insyd-poc-frontend.vercel.app](https://insyd-poc-frontend-git-main-praduman1916s-projects.vercel.app/)

## Repository
```bash
git clone https://github.com/Praduman1916/insyd-poc-frontend
cd insyd-poc-frontend
```

##  Setup
1. Install: `npm install`
2. Run: `npm run dev`
3. Visit: `http://localhost:3000`

##  Tech Stack
- Next.js  (App Router)
- Tailwind CSS
- Axios for API calls


##  Core Features

### 1. Notification Management
- **Add Notifications**: Submit new messages via simple form
- **Infinite Scroll**: Dynamically loads notifications as you scroll
- **Real-time Updates**: Instant display of new notifications


## API Endpoints

| Method | Endpoint                | Description                     |
|--------|-------------------------|---------------------------------|
| POST   | `/api/v1/notifications`    | Create new notification         |
| GET    | `/api/v1/notifications`    | Fetch notifications (paginated) |



##  Deployment Status
**Backend**: Hosted on Railway  
**Frontend**: Auto-deployed via Vercel
```
