## 🏛 NestJS Enterprise Pull Request Template

### 📋 Overview
<!-- Provide a clear and concise summary of the changes and the motivation behind them. -->

**Related Task/Issue:** Fixes # (issue number)

---

### 🛠 Type of Change
- [ ] 🚀 **Feature**: New functionality.
- [ ] 🐛 **Fix**: Bug fix.
- [ ] 🛡️ **Security**: Security enhancement or fix.
- [ ] ⚡ **Optimization**: Performance or resource usage improvement.
- [ ] 🧹 **Refactor**: Code structure change without functional impact.
- [ ] 🧪 **Testing**: Adding or improving tests.
- [ ] 📖 **Documentation**: Swagger or README updates.
- [ ] ⚙️ **Config**: Infrastructure or environment changes.

---

### 🔍 Scope of Impact
- [ ] **Modules affected**: <!-- e.g., AuthModule, UsersModule -->
- [ ] **Database changes**:
    - [ ] Schema Migration (TypeORM/Prisma)
    - [ ] Seeding update
    - [ ] Index optimization
- [ ] **API Breaking Changes**:
    - [ ] Endpoint removed or renamed
    - [ ] Response structure changed
    - [ ] Required DTO/Query parameters changed

---

### 🛡 Security & Compliance
- [ ] Input validation (DTOs/Class-validator)
- [ ] Authentication/Authorization (Guards/Roles)
- [ ] Rate limiting / Throttling
- [ ] Sensitive data logging/exposure check

---

### ✅ Development Checklist
- [ ] **Architecture**: Follows NestJS best practices (Dependency Injection, Modular structure).
- [ ] **DTOs**: Validated with `class-validator` and documented with `@ApiProperty`.
- [ ] **Exceptions**: Used built-in or custom `HttpException` filters correctly.
- [ ] **Persistence**: Database queries are efficient; no N+1 problems.
- [ ] **Swagger**: OpenAPI/Swagger docs updated and verified.
- [ ] **Logging**: Meaningful logs added for production debugging.
- [ ] **Linting**: Code passes all project-specific ESLint/Prettier rules.

---

### 🧪 Testing & Validation
- [ ] Unit tests added/updated.
- [ ] Integration (E2E) tests added/updated.
- [ ] Manual verification via Swagger/Postman.
- [ ] Coverage reports checked.

---

### � Deployment & Observability
- [ ] **Logging**: Added appropriate context to logs for easier debugging.
- [ ] **Monitoring**: Updated relevant alerts or metrics.
- [ ] **Environment Variables**: New variables added to `.env.example`.
- [ ] **Rollback Plan**: Clear steps provided to revert this change if necessary.

---

### �📝 Additional Notes / Screenshots
<!-- Add any extra information, terminal logs, or Swagger screenshots here. -->

