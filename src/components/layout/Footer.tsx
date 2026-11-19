import type { ReactNode } from 'react'
import crown from '../../assets/brand/logo-crown.svg'
import payAmex from '../../assets/brand/pay-amex.svg'
import payBoleto from '../../assets/brand/pay-boleto.svg'
import payDiners from '../../assets/brand/pay-diners.svg'
import payElo from '../../assets/brand/pay-elo.svg'
import payMastercard from '../../assets/brand/pay-mastercard.svg'
import payPix from '../../assets/brand/pay-pix.svg'
import payVisa from '../../assets/brand/pay-visa.svg'
import vtex from '../../assets/brand/vtex.svg'
import wicomm from '../../assets/brand/wicomm.svg'
import { footer } from '../../data/footer'
import { Newsletter } from '../../sections/Newsletter'
import type { NavLink } from '../../types'
import { Icon } from '../ui/Icon'

const payments = [
  { src: payAmex, label: 'American Express' },
  { src: payDiners, label: 'Diners Club' },
  { src: payVisa, label: 'Visa' },
  { src: payMastercard, label: 'Mastercard' },
  { src: payElo, label: 'Elo' },
  { src: payPix, label: 'Pix' },
  { src: payBoleto, label: 'Boleto' },
]

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-base leading-[1.3] font-medium">{title}</h2>
      {children}
    </div>
  )
}

function LinkList({ links, spacious }: { links: readonly NavLink[]; spacious?: boolean }) {
  return (
    <ul
      className={`flex flex-col text-sm ${spacious ? 'leading-[27.2px] lg:whitespace-nowrap' : 'gap-2 leading-[1.3]'}`}
    >
      {links.map((link) => (
        <li key={link.label}>
          <a href={link.href} className="hover:underline">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export function Footer() {
  return (
    <footer className="bg-surface-muted">
      <div className="container-page flex flex-col gap-8 pt-8 pb-16">
        <Newsletter />

        <div className="flex flex-col gap-9 border-t border-line-soft pt-9">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[218px_repeat(4,1fr)] lg:gap-5">
            {/* Marca */}
            <div className="flex flex-col items-center gap-[18px] sm:col-span-2 lg:col-span-1">
              <img src={crown} alt="Amakha Paris" width={115} height={74} loading="lazy" />
              <ul className="flex gap-1">
                {footer.social.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} da Amakha Paris (nova aba)`}
                      className="grid size-[38px] place-items-center rounded-full transition hover:bg-white"
                    >
                      <Icon name={social.icon} />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex max-w-[202px] flex-col gap-2 text-left">
                <p className="text-xs leading-[1.3]">{footer.about}</p>
                <a href="#" className="text-sm hover:underline">
                  Ver mais<span className="sr-only"> sobre a Amakha Paris</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <Column title="INSTITUCIONAL">
                <LinkList links={footer.institutional} />
              </Column>
              <Column title="REPRESENTANTE">
                <LinkList links={footer.representative} />
              </Column>
              <img
                src="/images/footer/selo-qualidade.webp"
                srcSet="/images/footer/selo-qualidade.webp 1x, /images/footer/selo-qualidade@2x.webp 2x"
                alt="Selo Premium Quality International"
                width={72}
                height={72}
                loading="lazy"
              />
            </div>

            <Column title="AJUDA">
              <LinkList links={footer.help} spacious />
            </Column>

            <Column title="ATENDIMENTO">
              <address className="flex flex-col gap-2 not-italic">
                <a href={footer.phone.href} className="flex items-center gap-2.5 hover:underline">
                  <Icon name="call" className="shrink-0 text-[#292632]" />
                  <span className="text-sm leading-[1.3]">
                    {footer.phone.label}
                    <span className="block text-xs font-light">{footer.phone.note}</span>
                  </span>
                </a>
                <a
                  href={`mailto:${footer.email}`}
                  className="flex items-center gap-2.5 text-xs hover:underline"
                >
                  <Icon name="sms" className="shrink-0 text-[#292632]" />
                  {footer.email}
                </a>
              </address>
            </Column>

            <Column title="ONDE ESTAMOS">
              <ul className="flex flex-col gap-2">
                {footer.locations.map((location) => (
                  <li key={location.title} className="flex gap-2.5">
                    <Icon name={location.icon} className="shrink-0 text-[#292632]" />
                    <p className="text-sm leading-[1.3]">
                      {location.title}{' '}
                      {location.lines.map((line, index) => (
                        <span key={line} className="text-xs font-light">
                          {index > 0 && <br />}
                          {line}
                        </span>
                      ))}
                    </p>
                  </li>
                ))}
              </ul>
            </Column>
          </div>

          <div className="flex flex-col gap-6 border-t border-line-soft pt-9 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <h2 className="font-inter text-base font-medium">FORMAS DE PAGAMENTO:</h2>
              <ul className="flex flex-wrap gap-4">
                {payments.map((payment) => (
                  <li key={payment.label}>
                    <img
                      src={payment.src}
                      alt={payment.label}
                      width={34}
                      height={24}
                      loading="lazy"
                    />
                  </li>
                ))}
              </ul>
            </div>
            <p className="flex items-center gap-2.5">
              <span className="sr-only">Desenvolvido com</span>
              <img src={wicomm} alt="Wicomm" width={72} height={18} loading="lazy" />
              <img src={vtex} alt="VTEX" width={67} height={34} loading="lazy" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
