// app.js

import { pageInfo, showToast } from "./navigation.js";

const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");

export function showPage(pageName) {

    // Remove active navigation
    navLinks.forEach(link => {
        link.classList.remove("active");
    });

    // Activate selected navigation
    const selectedLink = document.querySelector(
        `.nav-link[data-page="${pageName}"]`
    );

    if (selectedLink) {
        selectedLink.classList.add("active");
    }

    // Hide all pages
    pages.forEach(page => {
        page.classList.remove("active-page");
    });

    // Show selected page
    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }

    // Update title
    if (pageInfo[pageName]) {
        pageTitle.textContent = pageInfo[pageName].title;
        pageSubtitle.textContent = pageInfo[pageName].subtitle;
    }

    // Close mobile sidebar
    document
        .querySelector(".sidebar")
        .classList.remove("mobile-open");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Navigation click
navLinks.forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const page = this.dataset.page;

        showPage(page);
    });

});


// Dark mode
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const icon = themeToggle.querySelector("i");

    if (document.body.classList.contains("dark")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        showToast("Dark mode enabled");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        showToast("Light mode enabled");
    }

});


// Initialize
document.addEventListener("DOMContentLoaded", () => {

    showPage("dashboard");

});
(function(){
  'use strict';
  var rawPage = (location.pathname.split('/').pop() || location.href.split('/').pop() || 'index.html');
  var page = decodeURIComponent(rawPage);

  function isAuthenticated(){
    try{ var u = JSON.parse(localStorage.getItem('placehub_user')||'null'); if(u && u.loggedIn) return true; }catch(e){}
    if(localStorage.getItem('oauth_google') || localStorage.getItem('oauth_microsoft')) return true;
    return false;
  }

  function requireAuth(){
    // When opened via the file: protocol (double-click), don't force redirects — allow local browsing.
    if(location.protocol !== 'http:' && location.protocol !== 'https:'){
      return;
    }
    var publicPages = ['project.html','register.html','forgot.html','oauth_callback.html','animeweb.html','web.html','learn.html'];
    if(!isAuthenticated() && publicPages.indexOf(page) === -1){
      location.href = 'project.html';
    }
  }

  function attachLogin(){
    var g = document.getElementById('googleLoginBtn');
    if(g) g.addEventListener('click', function(){
      localStorage.setItem('oauth_google', JSON.stringify({provider:'google', demo:true, ts: Date.now()}));
      window.location.href = 'home.html';
    });
    var m = document.getElementById('msLoginBtn');
    if(m) m.addEventListener('click', function(){
      localStorage.setItem('oauth_microsoft', JSON.stringify({provider:'microsoft', demo:true, ts: Date.now()}));
      window.location.href = 'home.html';
    });

    var form = document.getElementById('loginForm');
    if(form){
      var errEl = document.getElementById('loginError');
      function clearErr(){ if(errEl) errEl.textContent = ''; }
      form.addEventListener('input', clearErr);
      form.addEventListener('submit', function(e){
        e.preventDefault();
        clearErr();
        var username = (form.querySelector('input[type=text]')||{}).value || '';
        var password = (form.querySelector('input[type=password]')||{}).value || '';
        username = username.trim(); password = password.trim();
        if(!username || !password){ if(errEl) errEl.textContent = 'Please enter both username and password.'; else alert('Please enter both username and password.'); return; }
        localStorage.setItem('placehub_user', JSON.stringify({username: username, loggedIn: true, ts: Date.now()}));
        localStorage.setItem('placehub_user_profile', JSON.stringify({ fullName: username, email: '', department: '', regno: '', jobsApplied: 0, resumeProgress: 20 }));
        window.location.href = 'home.html';
      });
    }
  }

  function enhanceNav(){
    // insert minimal styles for active nav and form errors
    try{
      var s = document.createElement('style');
      s.textContent = '.form-error{color:#ff6b6b;margin-top:8px;font-size:14px;}.nav-active{background:rgba(255,255,255,0.06);transform:translateY(-1px);}';
      document.head.appendChild(s);
    }catch(e){}

    var nav = document.querySelector('nav.primary');
    if(!nav) return;
    // highlight active
    Array.from(nav.querySelectorAll('a')).forEach(function(a){
      try{
        var href = (a.getAttribute('href')||'').split('/').pop();
        if(!href) return;
        if(href === page){ a.classList.add('nav-active'); }
        else a.classList.remove('nav-active');
      }catch(e){}
    });

    // ensure logout anchors trigger logout
    Array.from(nav.querySelectorAll('a')).forEach(function(a){
      if(a.textContent && a.textContent.trim().toLowerCase() === 'logout'){
        a.addEventListener('click', function(e){ e.preventDefault(); localStorage.removeItem('placehub_user'); localStorage.removeItem('placehub_user_profile'); localStorage.removeItem('oauth_google'); localStorage.removeItem('oauth_microsoft'); location.href = 'project.html'; });
      }
    });

    // show/hide profile button depending on auth state
    var profileBtn = document.getElementById('profileBtn');
    if(profileBtn){ profileBtn.style.display = isAuthenticated() ? '' : 'none'; }
  }

  function attachRegister(){
    var form = document.getElementById('registerForm');
    if(form){
      var errEl = document.getElementById('registerError');
      function clearErr(){ if(errEl) errEl.textContent = ''; }
      form.addEventListener('input', clearErr);
      form.addEventListener('submit', function(e){
        e.preventDefault();
        clearErr();
        var fullname = (form.querySelector('[name=fullname]')||{}).value||'';
        var email = (form.querySelector('[name=email]')||{}).value||'';
        var department = (form.querySelector('[name=department]')||{}).value||'';
        var regno = (form.querySelector('[name=regno]')||{}).value||'';
        var password = (form.querySelector('#password')||{}).value||'';
        var confirmPassword = (form.querySelector('#confirmPassword')||{}).value||'';
        fullname = fullname.trim(); email = email.trim(); department = department.trim(); regno = regno.trim(); password = password.trim(); confirmPassword = confirmPassword.trim();
        if(password.length < 8){ if(errEl) errEl.textContent = 'Password must be at least 8 characters.'; else alert('Password must be at least 8 characters.'); return; }
        if(password !== confirmPassword){ if(errEl) errEl.textContent = 'Passwords do not match.'; else alert('Passwords do not match.'); return; }
        if(!fullname || !email || !department || !regno){ if(errEl) errEl.textContent = 'Please complete all fields.'; else alert('Please complete all fields.'); return; }
        localStorage.setItem('placehub_user', JSON.stringify({username: fullname, email: email, loggedIn: true, ts: Date.now()}));
        localStorage.setItem('placehub_user_profile', JSON.stringify({ fullName: fullname, email: email, department: department, regno: regno, jobsApplied: 0, resumeProgress: 20 }));
        window.location.href = 'home.html';
      });
    }

    var googleBtn = document.getElementById('googleBtn');
    var msBtn = document.getElementById('msBtn');
    function demoOAuth(provider){ localStorage.setItem('oauth_' + provider, JSON.stringify({provider: provider, demo: true, ts: Date.now()})); window.location.href = 'project.html'; }
    function startOAuth(provider){ demoOAuth(provider); }
    if(googleBtn) googleBtn.addEventListener('click', function(){ startOAuth('google'); });
    if(msBtn) msBtn.addEventListener('click', function(){ startOAuth('microsoft'); });
  }

  function setupProfile(){
    var profilePanel = document.getElementById('profilePanel');
    var profileBtn = document.getElementById('profileBtn');
    var profileCloseBtn = document.getElementById('profileCloseBtn');
    var jobsAppliedCount = document.getElementById('jobsAppliedCount');
    var resumeProgressCount = document.getElementById('resumeProgressCount');
    var profileName = document.getElementById('profileName');
    var applyJobBtn = document.getElementById('applyJobBtn');
    var updateResumeBtn = document.getElementById('updateResumeBtn');

    function getProfileData(){ var stored = localStorage.getItem('placehub_user_profile'); if(stored){ try{ return JSON.parse(stored); }catch(e){} } return { jobsApplied: 0, resumeProgress: 20 }; }
    function saveProfileData(data){ localStorage.setItem('placehub_user_profile', JSON.stringify(data)); }
    function renderProfile(){
      var profile = getProfileData();
      if(jobsAppliedCount) jobsAppliedCount.textContent = profile.jobsApplied || 0;
      if(resumeProgressCount) resumeProgressCount.textContent = (profile.resumeProgress||0) + '%';
      var currentUser = {};
      try{ currentUser = JSON.parse(localStorage.getItem('placehub_user')||'{}'); }catch(e){}
      var displayName = (profile.fullName) || (currentUser.username) || 'Student';
      if(profileName) profileName.textContent = displayName + "'s Profile";
      var elFull = document.getElementById('profileFullName'); if(elFull) elFull.textContent = displayName;
      var elEmail = document.getElementById('profileEmail'); if(elEmail) elEmail.textContent = profile.email || currentUser.email || 'Not set';
      var elDept = document.getElementById('profileDepartment'); if(elDept) elDept.textContent = profile.department || 'N/A';
      var elReg = document.getElementById('profileRegno'); if(elReg) elReg.textContent = profile.regno || 'N/A';
    }
    function openProfilePanel(){ if(profilePanel){ renderProfile(); profilePanel.classList.add('active'); profilePanel.setAttribute('aria-hidden','false'); } }
    function closeProfilePanel(){ if(profilePanel){ profilePanel.classList.remove('active'); profilePanel.setAttribute('aria-hidden','true'); } }

    if(profileBtn) profileBtn.addEventListener('click', function(e){ e.preventDefault(); openProfilePanel(); });
    if(profileCloseBtn) profileCloseBtn.addEventListener('click', closeProfilePanel);
    if(applyJobBtn) applyJobBtn.addEventListener('click', function(){ var p = getProfileData(); p.jobsApplied = (p.jobsApplied||0) + 1; saveProfileData(p); renderProfile(); });
    if(updateResumeBtn) updateResumeBtn.addEventListener('click', function(){ var p = getProfileData(); p.resumeProgress = Math.min(100, (p.resumeProgress||0) + 20); saveProfileData(p); renderProfile(); });
    window.addEventListener('load', renderProfile);
  }

  function attachLogout(){
    document.querySelectorAll('a').forEach(function(a){
      if(a.textContent && a.textContent.trim().toLowerCase() === 'logout'){
        a.addEventListener('click', function(e){ e.preventDefault(); localStorage.removeItem('placehub_user'); localStorage.removeItem('placehub_user_profile'); localStorage.removeItem('oauth_google'); localStorage.removeItem('oauth_microsoft'); location.href = 'project.html'; });
      }
    });
    var logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn) logoutBtn.addEventListener('click', function(){ localStorage.removeItem('placehub_user'); localStorage.removeItem('placehub_user_profile'); localStorage.removeItem('oauth_google'); localStorage.removeItem('oauth_microsoft'); location.href = 'project.html'; });
  }

  document.addEventListener('DOMContentLoaded', function(){
    attachLogin();
    attachRegister();
    setupProfile();
    attachLogout();
    enhanceNav();
    requireAuth();
  });

})();
