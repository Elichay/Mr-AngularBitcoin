import { Component, OnInit } from '@angular/core'
import { lastValueFrom, Subscription } from 'rxjs'
import { Contact } from '../../model/contact'
import { ContactService } from 'src/app/services/contact.service'
import { ActivatedRoute, Router } from '@angular/router'
import { User, Transfer } from 'src/app/model/user'
import { UserService } from 'src/app/services/user.service'
import { faCircleLeft, faUserSlash, faUserPen } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsPageComponent implements OnInit {
  faCircleLeft = faCircleLeft
  faUserSlash = faUserSlash
  faUserPen = faUserPen
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }
  user !: User
  transfers !: Transfer[]
  contactId !: string
  // @Input() contactId!: string
  // contact!: Contact | undefined
  contact!: Contact
  subscription!: Subscription

  async ngOnInit() {

    // this.subscription = this.route.params.subscribe(async params => {
    //   const contact = await lastValueFrom(this.contactService.getContactById(params['id']))
    //   this.contact = contact
    // })
    this.route.params.subscribe(params => {
      this.contactId = params['id'];
    })


    this.subscription = this.route.data.subscribe(data => {
      this.contact = data['contact']
    })

    // const contact = await lastValueFrom(this.contactService.getContactById(this.contactId))
    // this.contact = contact
  }

  onBack() {
    this.router.navigateByUrl('contact')
    // this.router.navigate(['/', 'contact'])
  }

  updateTransfers() {
    this.user = this.userService.getUser()
    this.transfers = this.user.transfers.filter(transfer => transfer.toId === this.contact._id)
  }

  onRemoveContact(ev: MouseEvent) {
    ev.stopPropagation()
    this.contactService.deleteContact(this.contactId)
    this.router.navigateByUrl('contact')
  }

  onEditContact(ev: MouseEvent) {
    ev.stopPropagation()
    this.router.navigate(['contact/edit', this.contact._id])
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}