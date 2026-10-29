// Meta Pixel (Pixel de Bárbara Kulaif) + evento "Contact" em todo clique para o WhatsApp
// + aviso de cookies: quem recusar não é mais medido (escolha salva no navegador, chave "cookies-vab").
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');

(function () {
  var CHAVE = 'cookies-vab';
  function ler() { try { return localStorage.getItem(CHAVE); } catch (e) { return null; } }
  function salvar(v) { try { localStorage.setItem(CHAVE, v); } catch (e) {} }

  if (ler() === 'recusado') fbq('consent', 'revoke');
  fbq('init', '373479003522225');
  fbq('track', 'PageView');

  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a[href]');
    if (a && /(wa\.me|api\.whatsapp\.com|whatsapp:)/i.test(a.href)) {
      fbq('track', 'Contact', { content_name: 'WhatsApp', pagina: location.pathname });
    }
  }, true);

  window.cookiesVab = {
    escolher: function (v) {
      salvar(v);
      fbq('consent', v === 'recusado' ? 'revoke' : 'grant');
      var aviso = document.getElementById('aviso-cookies');
      if (aviso) aviso.remove();
    }
  };

  function mostrarAviso() {
    if (ler() || /\/privacidade\//.test(location.pathname)) return;
    var css = document.createElement('style');
    css.textContent =
      '#aviso-cookies{position:fixed;z-index:9999;left:50%;transform:translateX(-50%);' +
      'bottom:calc(16px + env(safe-area-inset-bottom,0px));width:min(560px,calc(100% - 32px));' +
      'background:#002445;color:#E9EAEE;border-radius:14px;padding:14px 16px;' +
      'box-shadow:0 18px 40px -18px rgba(0,0,0,.55);font:500 13px/1.5 Montserrat,Arial,sans-serif;' +
      'display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px}' +
      '#aviso-cookies p{margin:0;flex:1 1 260px}#aviso-cookies a{color:#BAA28C}' +
      '#aviso-cookies .acoes{display:flex;gap:8px}' +
      '#aviso-cookies button{cursor:pointer;border-radius:30px;padding:8px 16px;font:700 13px Montserrat,Arial,sans-serif;' +
      'border:1.5px solid #E9EAEE;background:transparent;color:#E9EAEE}' +
      '#aviso-cookies button.ok{background:#E9EAEE;color:#002445}' +
      '#aviso-cookies button:focus-visible{outline:3px solid #BAA28C;outline-offset:2px}';
    document.head.appendChild(css);
    var aviso = document.createElement('div');
    aviso.id = 'aviso-cookies';
    aviso.setAttribute('role', 'region');
    aviso.setAttribute('aria-label', 'Aviso de cookies');
    aviso.innerHTML =
      '<p>Usamos cookies para medir as visitas e mostrar anúncios da Vida a Bordo a quem já conhece o site. ' +
      '<a href="/privacidade/#cookies">Saiba mais</a></p>' +
      '<div class="acoes"><button type="button" class="nao">Recusar</button><button type="button" class="ok">Ok</button></div>';
    aviso.querySelector('.ok').onclick = function () { window.cookiesVab.escolher('aceito'); };
    aviso.querySelector('.nao').onclick = function () { window.cookiesVab.escolher('recusado'); };
    document.body.appendChild(aviso);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mostrarAviso);
  else mostrarAviso();
})();
