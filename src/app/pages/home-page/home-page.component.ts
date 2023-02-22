import { Component } from '@angular/core'
import { BitcoinService } from '../../services/bitcoin.service'
import { UserService } from '../../services/user.service'
import { faBitcoinSign } from '@fortawesome/free-solid-svg-icons'

import { User } from '../../model/user'

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  faBitcoinSign = faBitcoinSign
user!: User
bitcoinRate!: number
usdRate!: number

constructor(private userService: UserService, private bitcoinService: BitcoinService) { }

async ngOnInit() {
  this.user = this.userService.getUser()
  this.bitcoinRate = await this.bitcoinService.getRate()
  this.usdRate = +(1/this.bitcoinRate).toFixed(2)
}

}
