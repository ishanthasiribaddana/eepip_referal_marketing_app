# WordPress MLM Module — Local Deployment Plan

**Purpose:** Set up a WordPress installation with an MLM plugin locally to visualize the binary MLM UI before replicating to React/TypeScript/TailwindCSS.

**Target:** Familiarize with WordPress MLM interfaces (dashboard, binary tree, commissions, registration) to guide React component design.

---

## Prerequisites

- Docker Desktop installed and running
- Windows PowerShell or Command Prompt
- At least 4GB RAM available for Docker

---

## Deployment Steps

### Step 1: Create WordPress Docker Setup

Create a new directory for WordPress MLM:

```powershell
mkdir F:\Exon\Java_Holdings_MLM\wordpress-mlm
cd F:\Exon\Java_Holdings_MLM\wordpress-mlm
```

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  wordpress:
    image: wordpress:latest
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wordpress_data:/var/www/html
    depends_on:
      - db

  db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
      MYSQL_ROOT_PASSWORD: rootpassword
    volumes:
      - db_data:/var/lib/mysql

volumes:
  wordpress_data:
  db_data:
```

Start WordPress:

```powershell
docker compose up -d
```

**Access:** http://localhost:8080

---

### Step 2: Complete WordPress Installation

1. Open http://localhost:8080
2. Select language (English)
3. Fill in site details:
   - Site Title: `EEPIP MLM Demo`
   - Username: `admin`
   - Password: `Admin@123` (choose your own)
   - Email: `admin@eepip.local`
4. Click "Install WordPress"
5. Log in with the credentials

---

### Step 3: Install WordPress MLM Plugin

**Recommended Plugin:** **Starter MLM** (free, binary tree support)

**Alternative Plugins:**
- WordPress MLM Pro (paid, more features)
- Ultimate MLM
- WP MLM Software

To install Starter MLM:

1. Go to **Plugins → Add New**
2. Search for: `Starter MLM`
3. Click **Install Now**
4. Click **Activate**

---

### Step 4: Configure MLM Settings

Navigate to **MLM → Settings** and configure:

#### General Settings
- **MLM Type:** Binary
- **Position:** Left/Right
- **Spillover:** Deepest available position
- **Business Volume (BV):** 1 enrollment = 1 BV

#### Commission Settings
- **Direct Sponsor Bonus:** 2% (Rs. 36,000 equivalent)
- **Binary Pairing:** 5% (Rs. 90,000 equivalent)
- **Matching Bonus:** 1.5% (Rs. 27,000 equivalent)
- **Payout Cycle:** Monthly
- **Max Pairs/Member:** 3
- **Minimum Payout:** Rs. 500

#### Rank Settings
- **Ranks:** Starter → Bronze → Silver → Gold → Platinum → Diamond
- **Bronze:** 2 direct recruits (1L+1R)
- **Silver:** 4 direct recruits, 6 team
- **Gold:** 6 direct recruits, 50 team
- **Platinum:** 8 direct recruits, 100 team
- **Diamond:** 12 direct recruits, 250 team

---

### Step 5: Create Test Users

Navigate to **Users → Add New** and create:

1. **root_user** (AI Engineer #1)
   - Role: Administrator
   - This will be your main test account

2. **user_left** (Left leg recruit)
   - Role: Subscriber
   - Sponsor: root_user
   - Position: Left

3. **user_right** (Right leg recruit)
   - Role: Subscriber
   - Sponsor: root_user
   - Position: Right

4. **user_left_child** (Left leg's left)
   - Role: Subscriber
   - Sponsor: user_left
   - Position: Left

5. **user_right_child** (Right leg's right)
   - Role: Subscriber
   - Sponsor: user_right
   - Position: Right

---

### Step 6: Build Binary Tree

Navigate to **MLM → Binary Tree**:

1. View the tree visualization
2. Verify node connections
3. Check BV distribution
4. Test expand/collapse functionality
5. Note the UI patterns:
   - How nodes are styled (colors, shapes)
   - How BV is displayed
   - How tree navigation works
   - How member details appear on click

---

### Step 7: Explore Dashboard

Navigate to **MLM → Dashboard** (or user dashboard):

Observe:
- Total earnings display
- Left/Right BV balance
- Rank badge
- Recent commissions table
- Team size stats
- Commission breakdown charts

**Note:** Screenshot these elements for React component design reference.

---

### Step 8: Explore Commissions

Navigate to **MLM → Commissions**:

Observe:
- Commission table columns (Date, Type, Amount, Status)
- Filter controls (Type, Status, Date range)
- Pagination
- Export buttons

---

### Step 9: Explore Registration

Navigate to **MLM → Register** (or frontend registration page):

Observe:
- Multi-step form flow
- Field grouping
- Validation messages
- Sponsor selection
- Position selection (Left/Right)
- Payment details section

---

### Step 10: Document UI Components

Create a document `react-mlm-conversion/wordpress-ui-reference.md` with:

#### Screenshot List
- Login page
- Dashboard (overview stats)
- Binary tree (expanded)
- Binary tree (collapsed)
- Commission table
- Commission filters
- Registration form (step 1)
- Registration form (step 2)
- Member profile page
- Rank progress page

#### UI Patterns to Replicate
| Component | WordPress Pattern | React Implementation |
|-----------|------------------|---------------------|
| Dashboard cards | Grid layout, icons, gradients | TailwindCSS grid + Lucide icons |
| Binary tree nodes | Circular/rectangular, color-coded | SVG or CSS-based nodes |
| Tree connectors | SVG lines with curves | SVG paths with Bezier curves |
| Commission table | Striped rows, status badges | TailwindCSS table + badge components |
| Form steps | Progress bar at top | Step indicator component |
| Navigation | Sidebar with icons | React Router + Lucide icons |

---

## Quick Reference Commands

```powershell
# Start WordPress
cd F:\Exon\Java_Holdings_MLM\wordpress-mlm
docker compose up -d

# Stop WordPress
docker compose down

# View logs
docker compose logs -f wordpress

# Access database (if needed)
docker exec -it wordpress-mlm-db-1 mysql -uwordpress -pwordpress wordpress
```

---

## WordPress MLM Access

| Item | Value |
|------|-------|
| **URL** | http://localhost:8080 |
| **Admin URL** | http://localhost:8080/wp-admin |
| **Username** | admin |
| **Password** | Admin@123 (or what you set) |
| **Database** | MySQL 8.0 on Docker |
| **Plugin** | Starter MLM (free) |

---

## What to Focus On During Exploration

1. **Binary Tree Visualization**
   - How nodes are rendered (HTML/CSS structure)
   - How tree depth is managed
   - How spillover is visualized
   - Expand/collapse interaction pattern

2. **Dashboard Layout**
   - Card design and spacing
   - Color scheme and typography
   - Data visualization (charts, progress bars)

3. **Commission Table**
   - Column structure and sorting
   - Status badge colors
   - Filter UI pattern

4. **Registration Flow**
   - Step-by-step progression
   - Form validation feedback
   - Sponsor search/selection UI

5. **Navigation**
   - Sidebar layout
   - Mobile responsiveness
   - Active state indicators

---

## After Exploration

Once familiarized with the WordPress MLM UI:

1. Take screenshots of key pages
2. Document CSS classes used (via browser DevTools)
3. Note color hex codes, fonts, spacing
4. Identify reusable components
5. Create component mapping plan for React

This will directly feed into Milestone 2–7 of the React development plan.

---

## Troubleshooting

### WordPress won't load at localhost:8080
- Check Docker Desktop is running
- Run `docker compose ps` to verify containers are up
- Check port 8080 is not in use by another app

### Plugin activation fails
- Check PHP error logs: `docker compose logs wordpress`
- Ensure MySQL is fully started before WordPress
- Try a different MLM plugin

### Cannot create users
- Ensure WordPress is installed correctly
- Check user role permissions
- Try creating from wp-admin directly

---

## Alternative: Use XAMPP (Non-Docker)

If Docker is not available, use XAMPP:

1. Download XAMPP from https://www.apachefriends.org/
2. Install Apache + MySQL + PHP
3. Download WordPress from https://wordpress.org/download/
4. Extract to `C:\xampp\htdocs\wordpress`
5. Create MySQL database via phpMyAdmin
6. Run WordPress installer at http://localhost/wordpress
7. Install MLM plugin via wp-admin

**XAMPP Access:** http://localhost/wordpress
